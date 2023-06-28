import styles from "./Politics.module.css";

const Politics= () => {

    return (
        <div className={styles.politics}>
          <h2 className={styles.titlePolitics}>Políticas de uso</h2>
          
          <div className={styles.detail}>
            <section className={styles.detailItem}>
            <h3>Cuidados del producto</h3>
             <p> Limpia y seca el equipo después de usarlo. 
             Almacénalo en un lugar fresco y seco. El buen mantenimiento asegura
             su rendimiento y seguridad.</p>
            </section>

            <section className={styles.detailItem}>
            <h3>Precauciones de uso</h3>
             <p> Tu seguridad es nuestra prioridad. Utiliza el equipo siguiendo 
              las instrucciones proporcionadas. Usa siempre equipo de protección. 
              El uso inapropiado puede causar daños y lesiones.</p>
            </section>

            <section className={styles.detailItem}>
            <h3>Cancelación</h3>
             <p > Para un reembolso completo, cancela con al menos 48 horas de anticipación. 
              Las cancelaciones con menos de 48 horas incurren en una tarifa del 50%. No se ofrecen reembolsos después del envío o entrega del equipamiento deportivo.</p>
            </section>
            
          </div>
        </div>
      );
    };
    
    export default Politics;