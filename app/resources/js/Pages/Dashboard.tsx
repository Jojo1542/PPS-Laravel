import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

interface DashboardProps {
    aviones: Avion[];
}

interface Avion {
    id: number;
    matricula: string;
    modelo: string;
    anio: number;
}

export default function Dashboard({ aviones }: DashboardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        matricula: '',
        modelo: '',
        anio: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        Inertia.post('/create-avion', formData, {
            onSuccess: () => {
                setIsModalOpen(false);
                setFormData({ matricula: '', modelo: '', anio: '' });

                // Actualizar la tabla localmente (opcional)
                aviones.push({id: Date.now().valueOf(), ...formData } as Avion);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Gestión de Aviones
                </h2>
            }
        >
            <Head title="Gestión de Aviones" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="mb-4 text-lg font-medium">
                                Lista de Aviones
                            </h3>
                            <button
                                className="mb-4 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Agregar Nuevo Avión
                            </button>
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
                                    <thead>
                                    <tr className="bg-gray-200 dark:bg-gray-700">
                                        <th>Matrícula</th>
                                        <th>Modelo</th>
                                        <th>Año</th>
                                        <th>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {aviones.map((avion) => (
                                        <tr key={avion.id}>
                                            <td>{avion.matricula}</td>
                                            <td>{avion.modelo}</td>
                                            <td>{avion.anio}</td>
                                            <td>
                                                <div className="flex space-x-2">
                                                    <button className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700">
                                                        Editar
                                                    </button>
                                                    <button className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700">
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md p-6 bg-white rounded-lg dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-semibold">Agregar Nuevo Avión</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label>Matrícula</label>
                                <input
                                    type="text"
                                    name="matricula"
                                    value={formData.matricula}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label>Modelo</label>
                                <input
                                    type="text"
                                    name="modelo"
                                    value={formData.modelo}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label>Año</label>
                                <input
                                    type="number"
                                    name="anio"
                                    value={formData.anio}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-lg"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded-lg"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
