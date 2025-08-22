import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchServices, createService, updateService, deleteService } from "../api/servicesApi";
import ServiceForm from "../components/ServiceForm";
import ServiceTable from "../components/ServiceTable";
import { motion, AnimatePresence } from "framer-motion";

const Services = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);

  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  const createMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, service }) => updateService(id, service),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services"] }),
  });

  const handleSubmit = (service) => {
    const formData = new FormData();
    formData.append("title", service.title);
    formData.append("description", service.description);
    formData.append("category", service.category);

    if (service.imageFile) {
      formData.append("image", service.imageFile);
    }

    if (editing) {
      updateMutation.mutate({ id: editing._id, service: formData });
      setEditing(null);
    } else {
      createMutation.mutate(formData);
    }
  };

  if (error) return <p className="text-red-500">Error loading services: {error.message}</p>;

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <motion.h2
        className="text-2xl font-bold mb-4 text-gray-800"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Manage Services
      </motion.h2>

      <ServiceForm onSubmit={handleSubmit} editing={editing} />

      <AnimatePresence>
        {isLoading ? (
          <motion.p
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500"
          >
            Loading services...
          </motion.p>
        ) : services.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500"
          >
            No services found.
          </motion.p>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ServiceTable
              services={services}
              onEdit={setEditing}
              onDelete={deleteMutation.mutate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
