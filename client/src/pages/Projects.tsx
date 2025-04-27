import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

const Projects = ({}: Props) => {
  return (
    <section className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="flex items-center justify-end px-4 lg:px-6">
          <Button variant="outline" className="gap-2">
            <PlusIcon /> <span>Add New Project</span>
          </Button>
        </div>
        {/* Grid of project cards with client count */}
        <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
          {/* Example project card */}
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Project Name</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                Project Title
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                5 Clients
              </div>
              <div className="text-muted-foreground">Project Description</div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Project Name</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                Project Title
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                5 Clients
              </div>
              <div className="text-muted-foreground">Project Description</div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Project Name</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                Project Title
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                5 Clients
              </div>
              <div className="text-muted-foreground">Project Description</div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Project Name</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                Project Title
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                5 Clients
              </div>
              <div className="text-muted-foreground">Project Description</div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;
