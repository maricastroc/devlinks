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

  $this->actingAs($this->user2);

  $response = $this->deleteJson(route('lists.destroy', $emailList->id));

  $response->assertStatus(Response::HTTP_FORBIDDEN);

  $this->assertDatabaseHas('email_lists', [
      'id' => $emailList->id,
      'title' => 'Email List Title',
  ]);
});

test('I should only be able to get the lists created by my user', function () {
  $response = $this->postJson(route('lists.store'), [
    'title' => 'User 1 Email List',
    'listFile' => UploadedFile::fake()->createWithContent(
        'sample_names.csv',
        <<<'CSV'
        name,email
        jon doe,jondoe@gmail.com
        CSV
    ),
]);

  $response->assertStatus(Response::HTTP_CREATED);

  $this->actingAs($this->user2);

  $response = $this->postJson(route('lists.store'), [
      'title' => 'User 2 Email List',
      'listFile' => UploadedFile::fake()->createWithContent(
          'sample_names.csv',
          <<<'CSV'
          name,email
          jane doe,janedoe@gmail.com
          CSV
      ),
  ]);

  $response->assertStatus(Response::HTTP_CREATED);

  $this->actingAs($this->user1);

  $response = $this->getJson(route('lists.index'));

  $response->assertStatus(Response::HTTP_OK);

  $response->assertJsonFragment([
      'title' => 'User 1 Email List',
  ]);

  $response->assertJsonMissing([
      'title' => 'User 2 Email List',
  ]);
});

test('I should not be able to create a list with the same title of an existing list', function () {
  $response = $this->postJson(route('lists.store'), [
      'title' => 'Unique Email List Title',
      'listFile' => UploadedFile::fake()->createWithContent(
          'sample_names.csv',
          <<<'CSV'
          name,email
          jon doe,jondoe@gmail.com
          CSV
      ),
  ]);

  $response->assertStatus(Response::HTTP_CREATED);

  $response = $this->postJson(route('lists.store'), [
      'title' => 'Unique Email List Title',
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
      'title' => 'Unique Email List Title',
  ]);
});
