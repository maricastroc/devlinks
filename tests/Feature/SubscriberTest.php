<?php

use App\Models\EmailList;
use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;

beforeEach(function () {
  $this->user1 = User::factory()->create(); 

  $this->user2 = User::factory()->create();

  $this->actingAs($this->user1); 

  $this->emailList = EmailList::factory()->create([
    'user_id' => $this->user1->id,
]);
});

test('I should be able to create a subscriber', function () {
  $response = $this->postJson(route('subscribers.store', $this->emailList->id), [
      'name' => 'Jon Doe',
      'email' => 'jondoe@gmail.com',
      'email_list_id' => $this->emailList->id,
  ]);

  $response->assertStatus(Response::HTTP_CREATED);

  $this->assertDatabaseHas('subscribers', [
    'name' => 'Jon Doe',
    'email' => 'jondoe@gmail.com',
    'email_list_id' => $this->emailList->id,
  ]);
});

test('I should be able to update a subscriber', function () {
  $response = $this->postJson(route('subscribers.store', $this->emailList->id), [
    'name' => 'Jon Doe',
    'email' => 'jondoe@gmail.com',
    'email_list_id' => $this->emailList->id,
]);

  $response->assertStatus(Response::HTTP_CREATED);

  $subscriber = Subscriber::first();

  $response = $this->putJson(route('subscribers.update', [
    'list' => $this->emailList->id,
    'subscriber' => $subscriber->id,
  ]), [
      'name' => 'Jon Doe 2',
      'email' => 'jondoe@gmail.com',
      'email_list_id' => $this->emailList->id,
  ]);

  $response->assertStatus(Response::HTTP_OK);

  $this->assertDatabaseHas('subscribers', [
      'id' => $subscriber->id,
      'name' => 'Jon Doe 2',
  ]);
});

test('I should be able to delete a subscriber', function () {
  $response = $this->postJson(route('subscribers.store', $this->emailList->id), [
    'name' => 'Jon Doe',
    'email' => 'jondoe@gmail.com',
    'email_list_id' => $this->emailList->id,
]);

  $response->assertStatus(Response::HTTP_CREATED);

  $subscriber = Subscriber::first();

  $response = $this->deleteJson(route('subscribers.destroy', [
    'list' => $this->emailList->id,
    'subscriber' => $subscriber->id,
  ]));

  $response->assertStatus(Response::HTTP_OK);

  $this->assertSoftDeleted('subscribers', [
      'id' => $subscriber->id,
  ]);
});

test('I should not be able to edit a subscriber from another user', function () {
  $emailList = EmailList::factory()->create([
    'title' => 'Email List Title',
    'user_id' => $this->user2->id,
  ]);

  $subscriber = Subscriber::factory()->create([
    'name' => 'Another User Subscriber',
    'email' => 'anotherusersubscriber@email.com',
    'email_list_id' => $emailList->id,
  ]);

  $response = $this->putJson(route('subscribers.update', [
    'list' => $emailList->id,
    'subscriber' => $subscriber->id,
  ]), [
      'name' => 'Jon Doe',
      'email' => 'jondoe@gmail.com',
      'email_list_id' => $emailList->id,
  ]);

  $response->assertStatus(Response::HTTP_FORBIDDEN);

  $this->assertDatabaseMissing('subscribers', [
    'id' => $subscriber->id,
    'name' => 'Jon Doe',
  ]);

  $this->assertDatabaseHas('subscribers', [
    'id' => $subscriber->id,
    'name' => 'Another User Subscriber',
  ]);
});

test('I should not be able to delete a subscriber from another user', function () {
  $emailList = EmailList::factory()->create([
    'title' => 'Email List Title',
    'user_id' => $this->user2->id,
  ]);

  $subscriber = Subscriber::factory()->create([
    'name' => 'Another User Subscriber',
    'email' => 'anotherusersubscriber@email.com',
    'email_list_id' => $emailList->id,
  ]);

  $response = $this->deleteJson(route('subscribers.destroy', [
    'list' => $emailList->id,
    'subscriber' => $subscriber->id,
  ]));

  $response->assertStatus(Response::HTTP_FORBIDDEN);

  $this->assertDatabaseHas('subscribers', [
    'id' => $subscriber->id,
    'name' => 'Another User Subscriber',
  ]);
});

test('I should only be able to get the subscribers created by my user', function () {
  $emailList2 = EmailList::factory()->create([
    'title' => 'Email List Title',
    'user_id' => $this->user2->id,
  ]);
  
  Subscriber::factory()->create([
    'name' => 'Subscriber 1',
    'email' => 'subscriber1@email.com',
    'email_list_id' => $this->emailList->id,
  ]);

  Subscriber::factory()->create([
    'name' => 'Subscriber 2',
    'email' => 'subscriber2@email.com',
    'email_list_id' => $this->emailList->id,
  ]);

  $subscriber3 = Subscriber::factory()->create([
    'name' => 'Subscriber 3',
    'email' => 'subscriber3@email.com',
    'email_list_id' => $emailList2->id,
  ]);

  $response = $this->getJson(route('lists.show', $this->emailList->id));

  $response->assertStatus(Response::HTTP_OK);

  $response->assertJsonCount(2, 'data');

  $response->assertJsonFragment([
    'name' => 'Subscriber 1',
  ]);

  $response->assertJsonFragment([
      'name' => 'Subscriber 2',
  ]);

  $response->assertJsonMissing([
      'name' => $subscriber3->name,
  ]);
});

test('I should not be able to create a subscriber with the same email of an existing subscriber from the same list', function () {
  Subscriber::factory()->create([
    'name' => 'Jon Doe',
    'email' => 'jondoe@gmail.com',
    'email_list_id' => $this->emailList->id,
  ]);

  $response = $this->postJson(route('subscribers.store', $this->emailList->id), [
    'name' => 'Jon Doe 2',
    'email' => 'jondoe@gmail.com',
    'email_list_id' => $this->emailList->id,
  ]);

  $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);

  $response->assertJsonValidationErrors(['email']);

  $this->assertDatabaseCount('subscribers', 1);

  $this->assertDatabaseHas('subscribers', [
      'name' => 'Jon Doe',
  ]);
});

test('I should be able to create a subscriber with the same email of an existing subscriber from another list', function () {
  $emailList2 = EmailList::factory()->create([
    'title' => 'Email List Title',
    'user_id' => $this->user1->id,
  ]);
  
  Subscriber::factory()->create([
    'name' => 'Jon Doe',
    'email' => 'jondoe@gmail.com',
    'email_list_id' => $emailList2->id,
  ]);

  $response = $this->postJson(route('subscribers.store', $this->emailList->id), [
    'name' => 'Jon Doe 2',
    'email' => 'jondoe@gmail.com',
    'email_list_id' => $this->emailList->id,
  ]);

  $response->assertStatus(Response::HTTP_CREATED);

  $this->assertDatabaseCount('subscribers', 2);

  $this->assertDatabaseHas('subscribers', [
      'name' => 'Jon Doe',
  ]);

  $this->assertDatabaseHas('subscribers', [
    'name' => 'Jon Doe 2',
  ]);
});

test('I should not be able to update a subscriber with the same email of an existing subscriber from the same list', function () {
  Subscriber::factory()->create([
    'name' => 'Jon Doe',
    'email' => 'jondoe@gmail.com',
    'email_list_id' => $this->emailList->id,
  ]);

  $subscriber = Subscriber::factory()->create([
    'name' => 'Jon Doe 2',
    'email' => 'jondoe2@gmail.com',
    'email_list_id' => $this->emailList->id,
  ]);

  $response = $this->putJson(route('subscribers.update', [
    'list' => $this->emailList->id,
    'subscriber' => $subscriber->id,
  ]), [
      'name' => 'Jon Doe',
      'email' => 'jondoe@gmail.com',
      'email_list_id' => $this->emailList->id,
  ]);

    $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);

    $response->assertJsonValidationErrors(['email']);
});

test('I should be able to update a subscriber with the same email of an existing subscriber from another list', function () {
  Subscriber::factory()->create([
    'name' => 'Jon Doe',
    'email' => 'jondoe@gmail.com',
    'email_list_id' => $this->emailList->id,
  ]);

  $emailList2 = EmailList::factory()->create([
    'title' => 'Email List Title',
    'user_id' => $this->user1->id,
  ]);

  $subscriber = Subscriber::factory()->create([
    'name' => 'Jon Doe 2',
    'email' => 'jondoe2@gmail.com',
    'email_list_id' => $this->emailList->id,
  ]);

  $response = $this->putJson(route('subscribers.update', [
    'list' => $this->emailList->id,
    'subscriber' => $subscriber->id,
  ]), [
      'name' => 'Jon Doe',
      'email' => 'jondoe@gmail.com',
      'email_list_id' => $emailList2->id,
  ]);

    $response->assertStatus(Response::HTTP_OK);
});
