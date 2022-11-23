import { useState } from "react";

const useModalHook = () => {
  const [isModal, setIsModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState<string | null>(null);

  return { id, setId, isModal, setIsModal, confirm, setConfirm } as const;
};

export default useModalHook;
