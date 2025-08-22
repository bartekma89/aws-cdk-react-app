import { handler } from "../src/services/spaces/handler";

handler({
  httpMethod: "POST",
  body: JSON.stringify({ location: "gdansk", name: "gonzo" }),
} as any);

// handler({
//   httpMethod: "DELETE",
//   queryStringParameters: { id: "ca0735cd-7b0d-4dbf-a877-56385aff6ef5" },
// } as any);

// handler({
//   httpMethod: "GET",
//   queryStringParameters: { id: "ca0735cd-7b0d-4dbf-a877-56385aff6ef5" },
// } as any);

handler({
  httpMethod: "PUT",
  queryStringParameters: { id: "3d81095f-57a3-43fd-b29f-535c262a79a6" },
  body: JSON.stringify({ name: "gonzo 3" }),
} as any);
