import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchContacts, deleteContact } from "../api/contactApi";
import ContactTable from "../components/ContactTable";
import { motion } from "framer-motion";

const Contacts = () => {
  const queryClient = useQueryClient();

  const { data: contacts = [], isLoading, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contacts"] }),
  });

  if (isLoading)
    return (
      <motion.p
        className="text-gray-500 text-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading...
      </motion.p>
    );

  if (error)
    return (
      <motion.p
        className="text-red-500 text-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Error: {error.message}
      </motion.p>
    );

  return (
    <div className="p-5">
      <motion.h2
        className="text-2xl font-bold mb-6 text-gray-800"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        User Messages
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ContactTable contacts={contacts} onDelete={deleteMutation.mutate} />
      </motion.div>
    </div>
  );
};

export default Contacts;
