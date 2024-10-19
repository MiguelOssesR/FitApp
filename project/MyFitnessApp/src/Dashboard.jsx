import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { auth } from '../firebase';

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [rpe, setRpe] = useState('');
  const [commit, setCommit] = useState('');
  const [rest, setRest] = useState('');

  //Añadir nuevo registro
  async function addRecord(e) {
    e.preventDefault();
    const user = auth.currentUser; // Obtén el usuario actual autenticado
    if (!user) {
      console.error("No hay usuario autenticado desde AddRecord");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "records"), {
        userId: user.uid,
        exerciseName: exerciseName,
        weight: weight,
        repetitions: repetitions,
        rpe: rpe,
        commit: commit,
        rest: rest,
        date: new Date().toISOString(), // Fecha y hora para ordenar los registros
      });
      fetchRecords();
    } catch (e) {
      console.error("Error añadiendo documento: ", e);
    }
  }

  //Obtener los registros del USUARIO ACTUAL
  async function fetchRecords() {
    const user = auth.currentUser;
    if (!user) {
      console.error("No hay usuario autenticado desde FetchRecords");
      return;
    }

    const q = query(collection(db, "records"), where("userId", "==", user.uid), orderBy("date", "desc"));

    const querySnapshot = await getDocs(q);
    const recordsData = [];
    querySnapshot.forEach((doc) => {
      recordsData.push({ id: doc.id, ...doc.data() });
    });
    setRecords(recordsData);
  }

// Eliminar un registro
async function deleteRecord(recordId) {
    try {
        await deleteDoc(doc(db, "records", recordId));
        console.log("Registro eliminado con ID: ", recordId);
        fetchRecords(); // Recargar los registros después de eliminar
    } catch (e) {
        console.error("Error eliminando documento: ", e);
    }
}

  // UseEffect sirve para cargar los registros cuando se monta el componente
  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">DASHBOARD</h1>

      {/* Formulario para añadir registros */}
      <form onSubmit={addRecord}>

      <div className="form-group">
          <label>Ejercicio</label>
          <input
            type="text"
            className="form-control"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>KG</label>
          <input
            type="number"
            className="form-control"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Repeticiones</label>
          <input
            type="number"
            className="form-control"
            value={repetitions}
            onChange={(e) => setRepetitions(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>RPE</label>
          <input
            type="number"
            className="form-control"
            value={rpe}
            onChange={(e) => setRpe(e.target.value)}
            required
          />
        </div>


        <div className="form-group">
          <label>Comentario</label>
          <input
            type="text"
            className="form-control"
            value={commit}
            onChange={(e) => setCommit(e.target.value)}
          />
        </div>


        <div className="form-group">
          <label>Descanso</label>
          <input
            type="number"
            className="form-control"
            value={rest}
            onChange={(e) => setRest(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success my-3">Agregar Registro</button>
      </form>

      {/* Tabla para mostrar los registros */}
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID Registro</th>
            <th scope="col">Tipo de Ejercicio</th>
            <th scope="col">KG</th>
            <th scope="col">Repeticiones</th>
            <th scope="col">RPE</th>
            <th scope="col">Comentario</th>
            <th scope="col">Acciones</th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.exerciseName}</td>
              <td>{record.weight}</td>
              <td>{record.repetitions}</td>
              <td>{record.rpe}</td>
              <td>{record.commit}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteRecord(record.id)}
                >
                  Eliminar
                </button>
              </td>
              <td>{new Date(record.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
