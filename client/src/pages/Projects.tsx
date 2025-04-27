import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProjectForm from "@/components/ProjectForm";
import { project } from "@/api";
import { useEffect, useState } from "react";

const Projects = () => {
  const [projectData, setProjectData] = useState<any>();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch projects from the API
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await project.getAllProjects();
      setProjectData(response.data || []);
      console.log("Project data:", response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch projects data when the component mounts or when refreshTrigger changes
  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger]);

  // console.log("Project data:", projectData);

  return (
    <section className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="flex items-center justify-end px-4 lg:px-6">
          <ProjectForm
            onProjectAdded={() => setRefreshTrigger((prev) => prev + 1)}
          />
        </div>
        {/* Grid of project cards with project count */}
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <p>Loading...</p>
          </div>
        ) : projectData && projectData.length > 0 ? (
          <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            {projectData.map((project: any) => (
              <Card className="@container/card" key={project._id}>
                <CardHeader className="relative">
                  <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                    {project.name}
                  </CardTitle>
                  <CardDescription>
                    <span>
                      Created on:{" "}
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                  <div className="line-clamp-1 flex gap-2 font-medium">
                    {project?.clientsEnrolled?.length}{" "}
                    {project?.clientsEnrolled?.length > 1
                      ? "Enrolled"
                      : "Enrolled"}{" "}
                    {project?.clientsEnrolled?.length > 1
                      ? "Clients"
                      : "Client"}
                  </div>
                  <div className="text-muted-foreground">
                    {project.description}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p>No projects found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
