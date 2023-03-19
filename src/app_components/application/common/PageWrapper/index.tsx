import './styles.css';
import { PrimaryTitle } from '../../../../app_atomic/Title';
import useWebTitle from '../../../../app_hooks/useWebTitle';
import PageLoading from '../../../Loading/PageLoading';
import PageError from '../../../PagePoster/PageError';
import type { PageWrapperProps } from './interfaces';

const PageWrapper = ({
    pageTitle = "Wispio page",
    children,
    isLoading = false,
    error = null,
    extendedTitle = undefined,
    usePadding = true,
}: PageWrapperProps) => {

    useWebTitle(`${pageTitle} - ${ import.meta.env.VITE_APPLICATION_NAME }`);

    return <section className="flex flex-col duration-150 min-h-screen max-h-screen h-screen opening-page-wrapper">
        <div className='bg-white flex gap-4 flex-row items-center shrink-0 shadow-lg shadow-slate-200/40 px-4 py-1 sm:px-5 sm:py-2 md:px-6 md:py-1.5'>
            <PrimaryTitle>
                {pageTitle}
            </PrimaryTitle>
            {
                extendedTitle && <h2 className='text-slate-600 pt-0.5 text-sm md:text-base font-medium'>
                    {extendedTitle}
                </h2>
            }
        </div>
        <div className={
            usePadding ? "p-4 sm:p-5 md:p-6 relative h-full page-wrapper-agent" : "relative h-full page-wrapper-agent"
        }>
            {
                error ? <PageError message={error} /> :
                    isLoading ? <PageLoading /> : children
            }
        </div>
    </section>;
};

export default PageWrapper;