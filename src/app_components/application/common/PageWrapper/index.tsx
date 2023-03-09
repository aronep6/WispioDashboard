import { PrimaryTitle } from '../../../../app_atomic/Title';
import useWebTitle from '../../../../app_hooks/useWebTitle';
import PageLoading from '../../../Loading/PageLoading';
import PageError from '../../../Error/PageError';
import type { PageWrapperProps } from './interfaces';

const PageWrapper = ({
    pageTitle = "Wispio page",
    children,
    isLoading = false,
    error = null,
    extendedTitle = undefined,
}: PageWrapperProps) => {

    useWebTitle(`${pageTitle} | Wispio Dashboard`);

    return <section className="flex flex-col duration-150 min-h-screen max-h-screen h-screen">
        <div className='bg-white flex gap-4 flex-row items-center shrink-0 shadow-lg shadow-slate-200/40 px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-4'>
            <PrimaryTitle>
                {pageTitle}
            </PrimaryTitle>
            {
                extendedTitle && <h2 className='text-slate-600 pt-0.5 text-sm md:text-base font-medium'>
                    {extendedTitle}
                </h2>
            }
        </div>
        <div className="p-4 sm:p-5 md:p-6 relative h-full">
            {
                error ? <PageError message={error} /> :
                    isLoading ? <PageLoading /> : children
            }
        </div>
    </section>;
};

export default PageWrapper;