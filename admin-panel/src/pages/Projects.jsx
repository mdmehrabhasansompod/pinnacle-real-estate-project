import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProjects, createProject, updateProject, deleteProject } from "../api/projectApi";
import ProjectForm from "../components/ProjectForm";
import ProjectTable from "../components/ProjectTable";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, project }) => updateProject(id, project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setEditing(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const handleSubmit = (formData) => {
    if (editing) {
      updateMutation.mutate({ id: editing._id, project: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (project) => setEditing(project);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteMutation.mutate(id);
    }
  };

  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <motion.h2
        className="text-2xl font-bold mb-4 text-gray-800"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Manage Projects
      </motion.h2>

      <ProjectForm onSubmit={handleSubmit} editing={editing} />

      <AnimatePresence>
        {isLoading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500"
          >
            Loading projects...
          </motion.p>
        ) : projects.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500"
          >
            No projects found.
          </motion.p>
        ) : (
          <motion.div
            key="project-table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ProjectTable
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;

