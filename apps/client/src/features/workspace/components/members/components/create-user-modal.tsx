import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { CreateUserForm } from "./create-user-form";

export default function CreateUserModal() {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button variant="default" onClick={open}>
        {t("Create Member")}
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title={t("Create New Member")}
        centered
      >
        <CreateUserForm onClose={close} />
      </Modal>
    </>
  );
}
