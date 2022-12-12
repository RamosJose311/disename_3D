import React from 'react'
import { RowTable } from './RowTable'
export default function ContentBeforeFooter() {
    return (
        <div className="container-fluid">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Titulo</th>
                        <th scope="col">Duración</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Genero</th>
                        <th scope="col">Premios</th>
                    </tr>
                </thead>
                <tbody>
                    <RowTable title="Billy Elliot" length="123" rating="5" genre="Drama y comedia" awards="2"/>
                    <RowTable title="Alicia en el pais de las maravillas" length="142" rating="4.8" genre="Drama, accion y comedia" awards="3"/>
                </tbody>
                <thead>
                    <tr>
                        <th scope="col">Titulo</th>
                        <th scope="col">Duración</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Genero</th>
                        <th scope="col">Premios</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}
