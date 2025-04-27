import { useEffect, useState } from "react";
import { client, project, doctor } from "@/api";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {};

const DashCards = ({}: Props) => {
  // State to hold the metrics data
  // Initialize the metrics state with default values
  const [metrics, setMetrics] = useState({
    clients: 0,
    projects: 0,
    enrollments: 0,
    doctors: 0,
    clientTrend: 0,
    projectTrend: 0,
    enrollmentTrend: 0,
    doctorTrend: 0,
  });

  // Effect to fetch data when the component mounts
  useEffect(() => {
    // Function to calculate the trend percentage
    const calculateTrend = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    // Function to get monthly counts of items based on their creation date
    const getMonthlyCounts = (data: any[]) => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // Calculate the previous month and year
      // Create a new date object and set the month to the previous month
      const previousMonthDate = new Date(now);
      previousMonthDate.setMonth(now.getMonth() - 1);
      const previousMonth = previousMonthDate.getMonth();
      const previousYear = previousMonthDate.getFullYear();

      return {
        current: data.filter((item: { createdAt: string }) => {
          const d = new Date(item.createdAt);
          return (
            d.getMonth() === currentMonth && d.getFullYear() === currentYear
          );
        }).length,
        previous: data.filter((item: { createdAt: string }) => {
          const d = new Date(item.createdAt);
          return (
            d.getMonth() === previousMonth && d.getFullYear() === previousYear
          );
        }).length,
      };
    };

    // Function to fetch data from the API
    // Using Promise.all to fetch data concurrently
    const fetchData = async () => {
      try {
        const [clientsRes, projectsRes, doctorsRes] = await Promise.all([
          client.getAllClients(),
          project.getAllProjects(),
          doctor.getAllDoctors(),
        ]);

        // Client metrics
        const clients = getMonthlyCounts(clientsRes.data);
        const clientTrend = calculateTrend(clients.current, clients.previous);

        // Project metrics
        const projects = getMonthlyCounts(projectsRes.data);
        const projectTrend = calculateTrend(
          projects.current,
          projects.previous
        );

        // Doctor metrics
        const doctors = getMonthlyCounts(doctorsRes.data);
        const doctorTrend = calculateTrend(doctors.current, doctors.previous);

        // Enrollment metrics
        const allEnrollments = clientsRes.data.flatMap(
          (c: { programEnrolled: any[] }) => c.programEnrolled
        );
        const enrollments = getMonthlyCounts(allEnrollments);
        const enrollmentTrend = calculateTrend(
          enrollments.current,
          enrollments.previous
        );

        // Set the metrics state with the fetched data
        setMetrics({
          clients: clientsRes.data.length,
          projects: projectsRes.data.length,
          enrollments: allEnrollments.length,
          doctors: doctorsRes.data.length,
          clientTrend,
          projectTrend,
          enrollmentTrend,
          doctorTrend,
        });
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchData();
  }, []);

  // Function to format the trend value as a percentage string
  // Adding a "+" sign for positive values and formatting to one decimal place
  const formatTrend = (value: number) =>
    `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {/* Clients Card */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Clients</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {metrics.clients}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {metrics.clientTrend > 0 ? (
                <TrendingUpIcon className="size-3" />
              ) : (
                <TrendingDownIcon className="size-3" />
              )}
              {formatTrend(metrics.clientTrend)}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {metrics.clientTrend > 0 ? "Growing" : "Declining"} this month
            {metrics.clientTrend > 0 ? (
              <TrendingUpIcon className="size-4" />
            ) : (
              <TrendingDownIcon className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Client acquisition performance
          </div>
        </CardFooter>
      </Card>

      {/* Projects Card */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Active Projects</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {metrics.projects}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {metrics.projectTrend > 0 ? (
                <TrendingUpIcon className="size-3" />
              ) : (
                <TrendingDownIcon className="size-3" />
              )}
              {formatTrend(metrics.projectTrend)}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {metrics.projectTrend > 0 ? "More" : "Fewer"} projects
            {metrics.projectTrend > 0 ? (
              <TrendingUpIcon className="size-4" />
            ) : (
              <TrendingDownIcon className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Current active initiatives
          </div>
        </CardFooter>
      </Card>

      {/* Enrollments Card */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Program Enrollments</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {metrics.enrollments}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {metrics.enrollmentTrend > 0 ? (
                <TrendingUpIcon className="size-3" />
              ) : (
                <TrendingDownIcon className="size-3" />
              )}
              {formatTrend(metrics.enrollmentTrend)}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {metrics.enrollmentTrend > 0 ? "Increasing" : "Decreasing"}{" "}
            engagement
            {metrics.enrollmentTrend > 0 ? (
              <TrendingUpIcon className="size-4" />
            ) : (
              <TrendingDownIcon className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Total program participations
          </div>
        </CardFooter>
      </Card>

      {/* Doctors Card */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Medical Team</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {metrics.doctors}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {metrics.doctorTrend > 0 ? (
                <TrendingUpIcon className="size-3" />
              ) : (
                <TrendingDownIcon className="size-3" />
              )}
              {formatTrend(metrics.doctorTrend)}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Team {metrics.doctorTrend > 0 ? "growth" : "reduction"}
            {metrics.doctorTrend > 0 ? (
              <TrendingUpIcon className="size-4" />
            ) : (
              <TrendingDownIcon className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Qualified medical professionals
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashCards;
