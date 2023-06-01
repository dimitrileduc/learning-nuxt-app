import MailchimpMarketing from "@mailchimp/mailchimp_marketing";

export default async function defineEventHandler(event: any) {
  const { email, username } = await readBody(event);

  MailchimpMarketing.setConfig({
    apiKey: "8c3b129557bce89151727bbcf3e892a3-us21",
    server: "us21",
  });

  const run = async () => {
    try {
      const response = await MailchimpMarketing.lists.addListMember(
        "cd76cd6995",
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            TYPE: "Registered", // Set the value based on the user's registration status
          },
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const runListsMergedFields = async () => {
    const response = await MailchimpMarketing.lists.getListMergeFields(
      "cd76cd6995"
    );
    console.log(response);
  };
  runListsMergedFields;
  const response = run();
  return response;
}
