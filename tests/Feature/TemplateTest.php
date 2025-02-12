<?php

use App\Models\EmailList;
use App\Models\Template;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;

beforeEach(function () {
  $this->user1 = User::factory()->create(); 

  $this->user2 = User::factory()->create();

  $this->actingAs($this->user1); 
});

test('I should be able to create a template', function () {
  $response = $this->postJson(route('templates.store'), [
      'name' => 'New Template',
      'body' => '<p>Body content</p>',
  ]);

  $response->assertStatus(Response::HTTP_CREATED);

  $this->assertDatabaseHas('templates', [
      'name' => 'New Template',
      'body' => '<p>Body content</p>',
  ]);
});

test('I should be able to update a list', function () {
  $response = $this->postJson(route('templates.store'), [
    'name' => 'New Template',
    'body' => '<p>Body content</p>',
  ]);

  $response->assertStatus(Response::HTTP_CREATED);

  $template = Template::first();

  $response = $this->putJson(route('templates.update', $template->id), [
      'name' => 'Updated Template',
      'body' => '<p>Updated body content</p>',
  ]);

  $response->assertStatus(Response::HTTP_OK);

  $this->assertDatabaseHas('templates', [
      'id' => $template->id,
      'name' => 'Updated Template',
      'body' => '<p>Updated body content</p>',
  ]);
});

test('I should be able to delete a template', function () {
  $response = $this->postJson(route('templates.store'), [
    'name' => 'New Template',
    'body' => '<p>Body content</p>',
  ]);

  $response->assertStatus(Response::HTTP_CREATED);

  $template = Template::first();

  $response = $this->deleteJson(route('templates.destroy', $template->id));

  $response->assertStatus(Response::HTTP_OK);

  $this->assertSoftDeleted('templates', [
      'id' => $template->id,
  ]);
});

test('I should not be able to edit a template from another user', function () {
  $template = Template::factory()->create([
    'name' => 'New Template',
    'body' => '<p>Body content</p>',
    'user_id' => $this->user1->id,
  ]);

  $this->actingAs($this->user2);

  $response = $this->putJson(route('templates.update', $template->id), [
    'name' => 'Updated Template',
    'body' => '<p>Body content</p>',
  ]);

  $response->assertStatus(Response::HTTP_FORBIDDEN);

  $this->assertDatabaseMissing('templates', [
      'id' => $template->id,
      'name' => 'Updated Template',
  ]);

  $this->assertDatabaseHas('templates', [
      'id' => $template->id,
      'name' => 'New Template',
  ]);
});