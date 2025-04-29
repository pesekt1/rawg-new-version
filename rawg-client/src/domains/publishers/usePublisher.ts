import usePublishers from "./usePublishers";

const usePublisher = (selectedPublisherId?: number) => {
  const { data } = usePublishers();
  const selectedPublisher = data?.results?.find(
    (publisher) => publisher.id === selectedPublisherId
  );

  return selectedPublisher;
};

export default usePublisher;
