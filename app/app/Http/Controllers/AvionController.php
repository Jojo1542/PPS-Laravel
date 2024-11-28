<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAvionRequest;
use App\Http\Requests\UpdateAvionRequest;
use App\Models\Avion;
use Illuminate\Http\Request;

class AvionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener todos los aviones y devolverlos a la vista de gestión
        $aviones = Avion::all();
        return inertia('Dashboard', compact('aviones'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Avion/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'matricula' => 'required|string|max:255|unique:aviones,matricula',
            'modelo' => 'required|string|max:255',
            'anio' => 'required|integer|min:1900|max:' . date('Y'),
        ]);

        Avion::create($validated);

        dd($request->all());

        return redirect()->back()->with('success', 'Avión creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Avion $avion)
    {
        return inertia('Avion/Show', compact('avion'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Avion $avion)
    {
        return inertia('Avion/Edit', compact('avion'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAvionRequest $request, Avion $avion)
    {
        $validated = $request->validated();
        $avion->update($validated);

        return redirect()->route('dashboard')->with('success', 'Avión actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Avion $avion)
    {
        $avion->delete();

        return redirect()->route('dashboard')->with('success', 'Avión eliminado correctamente.');
    }
}
