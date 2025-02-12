<?php

namespace App\Http\Controllers;

use App\Http\Requests\TemplateRequest;
use App\Http\Requests\UpdateTemplateRequest;
use App\Models\Template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Template::class);

        $user = $request->user();

        $search = $request->query('search', '');
        $withTrashed = $request->query('withTrashed', false);

        $templatesQuery = $user->templates()
        ->search($search);
    
        if ($withTrashed) {
            $templatesQuery->withTrashed();
        }

        $templates = $templatesQuery->orderBy('created_at', 'asc')
            ->paginate(10);

        if ($request->expectsJson()) {
            return response()->json($templates);
        }

        return Inertia::render('Templates/Index', [
            'templates' => $templates,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Template::class);

        return Inertia::render('Templates/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TemplateRequest $request)
    {
        try {
            $userId = auth()->id();
            
            $data = $request->validated();

            $data['user_id'] = $userId;
            
            Template::create($data);
            
            return response()->json([
                'message' => 'Template successfully created!',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create template. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Template $template)
    {
        $this->authorize('view', $template);

        return Inertia::render('Templates/Show', [
            'template' => $template,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Template $template)
    {
        $this->authorize('edit', $template);

        return Inertia::render('Templates/Form', [
            'template' => $template,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTemplateRequest $request, Template $template)
    {
        $this->authorize('update', $template);

        try {
            $data = $request->validated();
            $template->update($data);
    
            return response()->json([
                'message' => 'Template successfully updated!',
                'list' => $template,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the template.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Template $template)
    {
        $this->authorize('delete', $template);

        try {
            $template->delete();
    
            return response()->json([
                'message' => 'Template successfully deleted!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete template. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function restore(Template $template)
    {
        if (!$template) {
            return response()->json([
                'message' => 'Template not found.',
            ], 404);
        }
    
        if (!$template->trashed()) {
            return response()->json([
                'message' => 'This template is not deleted.',
            ], 400);
        }
    
        $this->authorize('restore', $template);
    
        try {
            $template->restore();
    
            return response()->json([
                'message' => 'Template successfully restored!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to restore template. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
