import MailchimpMarketing from "@mailchimp/mailchimp_marketing";

export default async function defineEventHandler(event: any) {
  const { email, username } = await readBody(event);

  MailchimpMarketing.setConfig({
    apiKey: "1ea202fed37c0b50d2249cda563c8731-us21",
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
