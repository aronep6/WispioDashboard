import useWebTitle from "../../../app_hooks/useWebTitle";

const Dashboard = () => {
    
    useWebTitle('Wispio AI - Dashboard');

    return (
        <div className="bg-red-200 p-8 text-lg">
            This is the dashboard page !
        </div>
    );
}

export default Dashboard;