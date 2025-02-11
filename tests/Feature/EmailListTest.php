<?php

use App\Models\EmailList;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;

beforeEach(function () {
  $this->user1 = User::factory()->create(); 

  $this->user2 = User::factory()->create();

  $this->actingAs($this->user1); 
});

test('I should be able to create a list', function () {
  $response = $this->postJson(route('lists.store'), [
      'title' => 'Email List Title',
      'listFile' => UploadedFile::fake()->createWithContent(
        'sample_names.csv',
        <<<'CSV'
        name,email
        jon doe,jondoe@gmail.com
        CSV
      ),
  ]);

  $response->assertStatus(Response::HTTP_CREATED);

  $this->assertDatabaseHas('subscribers', [
    'email_list_id' => 1,
    'name' => 'jon doe',
    'email' => 'jondoe@gmail.com',
  ]);
});

test('I should be able to update a list', function () {
  $response = $this->postJson(route('lists.store'), [
      'title' => 'Email List Title',
      'listFile' => UploadedFile::fake()->createWithContent(
          'sample_names.csv',
          <<<'CSV'
          name,email
          jon doe,jondoe@gmail.com
          CSV
      ),
  ]);

  $response->assertStatus(Response::HTTP_CREATED);

  $emailList = EmailList::first();

  $response = $this->putJson(route('lists.update', $emailList->id), [
      'title' => 'Updated Email List Title',
  ]);

  $response->assertStatus(Response::HTTP_OK);

  $this->assertDatabaseHas('email_lists', [
      'id' => $emailList->id,
      'title' => 'Updated Email List Title',
  ]);

  $this->assertDatabaseHas('subscribers', [
      'email_list_id' => $emailList->id,
      'name' => 'jon doe',
      'email' => 'jondoe@gmail.com',
  ]);
});

test('I should be able to delete a list', function () {
  $response = $this->postJson(route('lists.store'), [
      'title' => 'Email List Title',
      'listFile' => UploadedFile::fake()->createWithContent(
          'sample_names.csv',
          <<<'CSV'
          name,email
          jon doe,jondoe@gmail.com
          CSV
      ),
  ]);

  $response->assertStatus(Response::HTTP_CREATED);

  $emailList = EmailList::first();

  $response = $this->deleteJson(route('lists.destroy', $emailList->id));

  $response->assertStatus(Response::HTTP_OK);

  $this->assertSoftDeleted('email_lists', [
      'id' => $emailList->id,
  ]);

  $this->assertSoftDeleted('subscribers', [
      'email_list_id' => $emailList->id,
  ]);
});

test('I should not be able to edit a list from another user', function () {
  $emailList = EmailList::factory()->create([
    'title' => 'Email List Title',
    'user_id' => $this->user1->id,
  ]);

  $this->actingAs($this->user2);

  $response = $this->putJson(route('lists.update', $emailList->id), [
      'title' => 'Updated Email List Title',
  ]);

  $response->assertStatus(Response::HTTP_FORBIDDEN);

  $this->assertDatabaseMissing('email_lists', [
      'id' => $emailList->id,
      'title' => 'Updated Email List Title',
  ]);

  $this->assertDatabaseHas('email_lists', [
      'id' => $emailList->id,
      'title' => 'Email List Title',
  ]);
});

test('I should not be able to delete a list from another user', function () {
  $emailList = EmailList::factory()->create([
    'title' => 'Email List Title',
    'user_id' => $this->user1->id,
  ]);

  $this->actingAs($this->user2);

  $response = $this->deleteJson(route('lists.destroy', $emailList->id));

  $response->assertStatus(Response::HTTP_FORBIDDEN);

  $this->assertDatabaseHas('email_lists', [
      'id' => $emailList->id,
      'title' => 'Email List Title',
  ]);
});

test('I should only be able to get the lists created by my user', function () {
  EmailList::factory()->create([
    'title' => 'User 1 Email List 1',
    'user_id' => $this->user1->id,
  ]);

  EmailList::factory()->create([
    'title' => 'User 1 Email List 2',
    'user_id' => $this->user1->id,
  ]);

  $emailList3 = EmailList::factory()->create([
      'title' => 'User 2 Email List',
      'user_id' => $this->user2->id,
  ]);

  $response = $this->getJson(route('lists.index'));

  $response->assertStatus(Response::HTTP_OK);

  $response->assertJsonCount(2, 'data');

  $response->assertJsonMissing([
      'title' => $emailList3->title,
  ]);
});

test('I should not be able to create a list with the same title of an existing list', function () {
  EmailList::factory()->create([
    'title' => 'Email List',
  ]);

  $response = $this->postJson(route('lists.store'), [
      'title' => 'Email List',
      'listFile' => UploadedFile::fake()->createWithContent(
          'sample_names.csv',
          <<<'CSV'
          name,email
          jane doe,janedoe@gmail.com
          CSV
      ),
  ]);

  $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);

  $response->assertJsonValidationErrors(['title']);

  $this->assertDatabaseCount('email_lists', 1);

  $this->assertDatabaseHas('email_lists', [
      'title' => 'Email List',
  ]);
});
