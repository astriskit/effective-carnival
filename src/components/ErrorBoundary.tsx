import { useRouteError } from "react-router-dom"

export const ErrorBoundary = () => {
    const error = useRouteError()

    return <div>
        <h2>Oops! Something went wrong.</h2>
        <p>{(error as any)?.message}</p>
    </div>
}