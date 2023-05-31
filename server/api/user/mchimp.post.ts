import MailchimpMarketing from "@mailchimp/mailchimp_marketing";

export default async function defineEventHandler(event: any) {
  const { email, username } = await readBody(event);

  MailchimpMarketing.setConfig({
    apiKey: "c3333b38ec9e6821244d4f90581fd5bf-us10",
    server: "us10",
  });

  const run = async () => {
    try {
      const response = await MailchimpMarketing.lists.addListMember(
        "5154b36d2d",
        {
          email_address: email,
          status: "subscribed",
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const response = run();
  return response;
}
