const Alerta = ({ alerta }) => {
    if (!alerta.mensaje) return null;

    return (
        <div className={`alert ${alerta.error ? 'alert-danger' : 'alert-success'} role="alert"`}>
            {alerta.mensaje}
        </div>
    );
}

export default Alerta;
