import { useMemo, useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from './useUiStore';
import { useCalendarStore } from './useCalendarStore';


registerLocale('es', es)

export const useModalCalendar = () => {

    const { closeModalDate } = useUiStore()
    const { activeEvent, startSavingEvent } = useCalendarStore()
    const [formSubmited, setFormSubmited] = useState(false)

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    })

    const titleClass = useMemo(() => {

        if (!formSubmited) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid';

    }, [formValues.title, formSubmited])

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])


    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const closeModal = () => {
        closeModalDate()
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmited(true)

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'revisar la fechas ingresadas', 'error')
            return;
        }
        if (formValues.title.length <= 0) return;

        console.log(formValues)

        await startSavingEvent(formValues);
        closeModalDate();
        setFormSubmited(false)
    }

    return {
        formValues,
        titleClass,
        onInputChanged,
        onDateChanged,
        closeModal,
        onSubmit
    }
}
