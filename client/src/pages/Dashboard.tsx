import DashCards from "@/components/DashCards";
import { useUser } from "@/context/UserContext";

type Props = {};

const Dashboard = ({}: Props) => {
  const { user } = useUser();

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Salutations */}
        <div className="px-4 lg:px-6">
          <h1 className="text-2xl font-semibold">Dr. {user?.doctor?.name}</h1>
          <p className="text-muted-foreground">
            Welcome to your dashboard! Here you can find an overview of
            projects, and clients
          </p>
        </div>
        {/* Cards */}
        <DashCards />
      </div>
    </div>
  );
};

export default Dashboard;
