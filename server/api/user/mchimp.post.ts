import MailchimpMarketing from "@mailchimp/mailchimp_marketing";

export default async function defineEventHandler(event: any) {
  const { email, username } = await readBody(event);

  MailchimpMarketing.setConfig({
    apiKey: "a8fa444f14add11e519c69c9af71afc9-us21",
    server: "us21",
  });

  const run = async () => {
    try {
      const response = await MailchimpMarketing.lists.addListMember(
        "b4b2f71909",
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
