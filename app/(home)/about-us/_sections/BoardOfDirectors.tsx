import { fetchBoardMembers } from "@/lib/api/board";
import BoardOfDirectorsClient from "./BoardOfDirectorsClient";

// Server wrapper: members are managed from Admin > Board of Directors.
const BoardOfDirectors = async () => {
  const members = await fetchBoardMembers();

  // Hide the whole section until members are added from the admin panel
  if (members.length === 0) return null;

  return <BoardOfDirectorsClient members={members} />;
};

export default BoardOfDirectors;
