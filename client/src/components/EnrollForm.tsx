import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusIcon } from "lucide-react";
import { client, project } from "@/api";
import { useState, useEffect } from "react";

// Define props for the EnrollForm component
type EnrollFormProps = {
  onProjectEnrolled?: () => void; // Callback function to trigger table refresh
  clientId: string; // Client ID to enroll in the project
};

// Define our enroll form schema using Zod
const formSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
});

const EnrollForm = ({ onProjectEnrolled, clientId }: EnrollFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectData, setProjectData] = useState<any>();

  // Fetch projects from the API
  const fetchProjects = async () => {
    try {
      const response = await project.getAllProjects();
      setProjectData(response.data || []);
      console.log("Project data:", response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  console.log("Project data:", projectData);

  // Define our enroll form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: "",
    },
  });

  // Defining our submit function
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log("Form submitted", data);
    // Enroll client in the project logic
    try {
      const response = await client.enrollClientInProject(
        clientId,
        data.projectId
      );
      console.log("Client enrolled successfully:", response.data);
      // Optionally, you can reset the form or close the dialog here
      form.reset();
      setIsOpen(false); // Close the dialog
      onProjectEnrolled?.(); // Trigger table refresh
    } catch (error) {
      console.error("Error enrolling client in project:", error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="mr-1 h-4 w-4" />
          Enroll in Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enroll Client in Project</DialogTitle>
          <DialogDescription>
            Enroll the client in a project by selecting a project from the list.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project ID</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue="">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectData?.map((project: any) => (
                          <SelectItem key={project._id} value={project._id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Enroll</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollForm;
