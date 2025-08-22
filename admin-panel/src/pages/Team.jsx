import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTeams, createTeamMember, updateTeamMember, deleteTeamMember } from "../api/teamApi";
import TeamForm from "../components/TeamForm";
import TeamTable from "../components/TeamTable";
import { motion, AnimatePresence } from "framer-motion";

const Team = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);

  const { data: teams = [], isLoading, error } = useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });

  const createMutation = useMutation({
    mutationFn: createTeamMember,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teams"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, team }) => updateTeamMember({ id, team }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teams"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTeamMember,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teams"] }),
  });

  const handleSubmit = (teamData) => {
    const formData = new FormData();
    formData.append("name", teamData.name);
    formData.append("position", teamData.position);
    formData.append("bio", teamData.bio || "");
    if (teamData.imageFile) formData.append("image", teamData.imageFile);

    if (editing) {
      updateMutation.mutate({ id: editing._id, team: formData });
      setEditing(null);
    } else {
      createMutation.mutate(formData);
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
        Manage Team
      </motion.h2>

      <TeamForm onSubmit={handleSubmit} editing={editing} />

      <AnimatePresence>
        {isLoading ? (
          <motion.p
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500"
          >
            Loading team members...
          </motion.p>
        ) : teams.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500"
          >
            No team members found.
          </motion.p>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <TeamTable teams={teams} onEdit={setEditing} onDelete={deleteMutation.mutate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;
