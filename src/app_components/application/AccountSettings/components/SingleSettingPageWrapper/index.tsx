import { Card } from "../../../../../app_atomic/Card";
import { SecondaryTitle } from "../../../../../app_atomic/Title";
import useWebTitle from "../../../../../app_hooks/useWebTitle";
import type { SingleSettingPageWrapperProps } from "../../common/interfaces";

const SingleSettingPageWrapper = ({
    title,
    description,
    children,
}: SingleSettingPageWrapperProps) => {

  useWebTitle(`${title} - Paramètres - ${ import.meta.env.VITE_APPLICATION_NAME }`);

  return (
    <div className="flex flex-col w-full h-full p-4 pt-0 opening-page-wrapper gap-2 overflow-y-auto">
      <div className="sticky top-0 z-10 pt-4 backdrop-filter backdrop-blur-sm">
        <Card add="flex flex-col gap-1 shrink-0 shadow-lg shadow-slate-200 border-slate-400">
          <SecondaryTitle>
            { title }
          </SecondaryTitle>
          <p className="text-sm text-slate-500">
            { description }
          </p>
        </Card>
      </div>
      <div className="flex flex-col gap-2">
        {
          children
        }
      </div>
    </div>
  );
};

export default SingleSettingPageWrapper;