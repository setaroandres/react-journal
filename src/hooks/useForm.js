import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    //usamos el useState para actualizar es estado en las validaciones. Este formValidation nos va a decir claramente si hay un error o no
    //USamos un hook para poder redibujar el formulario y mosntrar si hay un error o si ya fue solucionado.
    const [formValidation, setFormValidation] = useState({

    });

    useEffect(() => {
      createValidators();
    
    }, [formState]); //Cada vez que el formState cambia mandamos a llamar a createValidators
    
    const isFormValid = useMemo( () => {
        // Aca barremos las propiedades para saber si alguna tiene un valor de null, a la primera que aparezca retornamos un false, sino seguimos
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation]);

    //Por cada campo tenemos un onInputChange. Esto lo qye hace es hacer un spread del estado anteriro para no sobreescribir nada y asignamos el valor al campo con el name que usamos.
    const onInputChange = ({ target }) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    //Lo que hace esta funcion es crear un nuevo estado y validar si los campos son validos o no
    const createValidators = () => {
        const formCheckValues = {};

        //Barremos cada uno de los fields y sus llaves (valores) del form que queremos validar
        for (const formField of Object.keys(formValidations)) {
            //desestructuramos la fn de validacion y el message de formValidations, para cada formField
            const [fn, errorMessage = 'Mensage generico de error'] = formValidations[formField];

            //Aca creamos los xxxValid para hacer la validacion en RegisterPage
            //Si es valido devuelve null y sino el error message
            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}