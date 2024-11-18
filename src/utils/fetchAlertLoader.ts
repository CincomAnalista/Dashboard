import Swal from 'sweetalert2';

export const fetchAlertLoader = async (
    url: string,
    options: RequestInit,
    setIsLoading: (isLoading: boolean) => void,
    successMessage: string,
    errorMessage: string,
    timer: number = 2000
) => {

    setIsLoading(true);
    try {
        const response = await fetch(url, options)
        const data = await response.json();
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: successMessage,
                showConfirmButton: false,
                timer: timer,
            })
            return data;
        } else {
            Swal.fire({
                icon: 'error',
                title: errorMessage,
                text: data || 'Error desconocido',
                showConfirmButton: false,
                timer: timer
            })
            throw new Error(data || 'Error desconocido');
        }
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: errorMessage,
            text: ` ${e}`,
            showConfirmButton: false,
            timer: timer
        })
        throw e;
    } finally {
        setIsLoading(false);
    }
}