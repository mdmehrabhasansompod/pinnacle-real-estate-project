import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNews, createNews, updateNews, deleteNews } from "../api/newsApi";
import NewsForm from "../components/NewsForm";
import NewsTable from "../components/NewsTable";
import { motion } from "framer-motion";

const News = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(null);

  const { data: news = [], isLoading, error } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  const createMutation = useMutation({
    mutationFn: createNews,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, news }) => updateNews(id, news),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNews,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
  });

  const handleSubmit = (newsData) => {
    const formData = new FormData();
    formData.append("title", newsData.title);
    formData.append("description", newsData.description);
    formData.append("category", newsData.category);

    if (newsData.image) formData.append("image", newsData.image);

    if (editing) {
      updateMutation.mutate({ id: editing._id, news: formData });
      setEditing(null);
    } else {
      createMutation.mutate(formData);
    }
  };

  if (error)
    return (
      <motion.p
        className="text-red-500 text-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Error loading news: {error.message}
      </motion.p>
    );

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <motion.h2
        className="text-2xl font-bold mb-6 text-gray-800"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Manage News
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <NewsForm onSubmit={handleSubmit} editing={editing} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {isLoading ? (
          <p className="text-gray-500 text-center mt-5">Loading...</p>
        ) : (
          <NewsTable
            news={news}
            onEdit={setEditing}
            onDelete={deleteMutation.mutate}
          />
        )}
      </motion.div>
    </div>
  );
};

export default News;

