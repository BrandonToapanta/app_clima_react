import { useState } from "react"

export const WheatherApp = () => {

    const URL_base = import.meta.env.VITE_URL_BASE
    const API_key = import.meta.env.VITE_API_KEY
    const difKelvin = import.meta.env.VITE_DIVKELVIN

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fechClima()
    }

    const fechClima = async () => {
        try {
            const response = await fetch(`${URL_base}?q=${ciudad}&appid=${API_key}`)
            const data = await response.json()
            setDataClima(data)
        } catch (error) {
            console.error("Ocurrio el siguente problema: ", error)
        }
    }

    return (
        <div className="container">
            <h1>Aplicacion de CLima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                />
                <button type="submit">Buscar</button>
            </form>
            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main.temp - difKelvin)} °C </p>
                        <p>Condicion Metereologica: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
                    </div>
                )
            }
        </div>
    )
}
