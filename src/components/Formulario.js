import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

import Error from '../components/Error';
const Boton = styled.button`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({ setMoneda, setCriptomoneda }) => {
    const [listaCripto, setListaCripto] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
    ];

    // utilizar useMoneda
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', MONEDAS);

    // Utilizar useCriptomoneda
    const [criptomoneda, SelectCriptomoneda] = useCriptomoneda('Elige tu criptomoneda', '', listaCripto);

    // Ejecutar el llamado de la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            setListaCripto(resultado.data.Data);
        };
        consultarAPI();
    }, []);

    const cotizarMoneda = (e) => {
        e.preventDefault();

        //validar ambos campos
        if (moneda === '' || criptomoneda === '') {
            setError(true);
            return;
        }

        // pasar los datos al componente principal
        setError(false);

        setMoneda(moneda);
        setCriptomoneda(criptomoneda);
    };

    return (
        <form onSubmit={cotizarMoneda}>
            {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
            <SelectMoneda />
            <SelectCriptomoneda />
            <Boton type='submit'>Cotizar</Boton>
        </form>
    );
};

export default Formulario;
