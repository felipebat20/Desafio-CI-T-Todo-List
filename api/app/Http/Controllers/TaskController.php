<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all();
    }

    public function store(Request $request)
    {
        $newTask = [
            'name'=> $request->name,
            'completed'=> false,
        ];

        return Task::create($newTask);
    }

    public function show(Task $task)
    {
        return $task;
    }

    public function update(Request $request, $id)
    {
        $existingTask = Task::find($id);
        if ($existingTask) {
            return $existingTask->update($request->all());
        }
    }

    public function destroy($id)
    {
        return Task::destroy($id);
    }
}
