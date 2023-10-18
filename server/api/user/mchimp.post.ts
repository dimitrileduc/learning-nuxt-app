import MailchimpMarketing from "@mailchimp/mailchimp_marketing";

export default async function defineEventHandler(event: any) {
  const config = useRuntimeConfig();
  const mailchimpKey = config.mailchimpSecret;

  const { email, username, tag } = await readBody(event);

  MailchimpMarketing.setConfig({
    apiKey: mailchimpKey,
    server: "us21",
  });

  console.log("tag to ass in mchimp", tag);

  const run = async () => {
    try {
      const response = await MailchimpMarketing.lists.addListMember(
        "cd76cd6995",
        {
          email_address: email,
          status: "subscribed",
          tags: [tag],
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
