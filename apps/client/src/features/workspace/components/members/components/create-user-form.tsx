import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { useCreateMemberMutation } from "@/features/workspace/queries/workspace-query";

interface Props {
  onClose: () => void;
}

export function CreateUserForm({ onClose }: Props) {
  const { t } = useTranslation();
  const createMemberMutation = useCreateMemberMutation();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t("Invalid email")),
      password: (value) =>
        value.length < 8 ? t("Password must be at least 8 characters") : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await createMemberMutation.mutateAsync(values);
    onClose();
  };

  return (
    <Box maw={500} mx="auto" component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label={t("Name")}
        placeholder={t("Enter name")}
        {...form.getInputProps("name")}
      />

      <TextInput
        mt="md"
        withAsterisk
        label={t("Email")}
        placeholder={t("Enter email")}
        {...form.getInputProps("email")}
      />

      <PasswordInput
        mt="md"
        withAsterisk
        label={t("Password")}
        placeholder={t("Enter password")}
        {...form.getInputProps("password")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={createMemberMutation.isPending}>
          {t("Create Member")}
        </Button>
      </Group>
    </Box>
  );
}
