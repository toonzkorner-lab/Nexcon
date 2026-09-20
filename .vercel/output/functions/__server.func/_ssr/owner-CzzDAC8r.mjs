import { r as createServerFn } from "./ssr.mjs";
import { It as object, Ot as _enum, zt as string } from "../_libs/@better-auth/core+[...].mjs";
import { A as saveSettings, B as upsertProduct, D as readSite, E as readInbox, F as setRowStatus, H as upsertReview, O as removeOwner, R as upsertBot, S as listOwners, U as upsertService, V as upsertProject, c as claimOrRequireOwner, d as deleteBySlug, f as deleteReview, k as replaceSimple, o as addOwner, z as upsertPost } from "./db-CgZiGDRe.mjs";
import { t as authMiddleware } from "./middleware-DplnsrPw.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/owner-CzzDAC8r.js
async function asOwner(userId) {
	await claimOrRequireOwner(userId);
}
var result = async (fn) => {
	try {
		return {
			ok: true,
			data: await fn()
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Request failed."
		};
	}
};
var ownerBootstrap_createServerFn_handler = createServerRpc({
	id: "f27781fa2e6f592de849352793111cd35706702969f6533cfde16da11fc1816a",
	name: "ownerBootstrap",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerBootstrap.__executeServer(opts));
var ownerBootstrap = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(ownerBootstrap_createServerFn_handler, async ({ context }) => result(async () => {
	await asOwner(context.userId);
	const [site, inbox, owners] = await Promise.all([
		readSite(false),
		readInbox(),
		listOwners()
	]);
	return {
		site,
		inbox,
		owners,
		userId: context.userId
	};
}));
var ownerSaveSettings_createServerFn_handler = createServerRpc({
	id: "990da8135db66b69fa0cab4da3bd912ba4e3c7b0ba5a1082b81f0c35a36c20c1",
	name: "ownerSaveSettings",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerSaveSettings.__executeServer(opts));
var ownerSaveSettings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(ownerSaveSettings_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await saveSettings(data);
}));
var ownerSaveFaqs_createServerFn_handler = createServerRpc({
	id: "a3487b9bf1198feba6e5aec55fd7a4d588aeab9c10217c601a1be751ef17cc98",
	name: "ownerSaveFaqs",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerSaveFaqs.__executeServer(opts));
var ownerSaveFaqs = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(ownerSaveFaqs_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await replaceSimple("faqs", data);
}));
var ownerSavePrinciples_createServerFn_handler = createServerRpc({
	id: "fbbd70d53d01a6ff15b545eeb6ab11c5260c7be7c8b9a058c3583544a374fe66",
	name: "ownerSavePrinciples",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerSavePrinciples.__executeServer(opts));
var ownerSavePrinciples = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(ownerSavePrinciples_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await replaceSimple("principles", data);
}));
var ownerSavePipeline_createServerFn_handler = createServerRpc({
	id: "6a5c4f93d16d3bfba5364d4b2985e90b1f5f6280424522d98780b7c2305a63ba",
	name: "ownerSavePipeline",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerSavePipeline.__executeServer(opts));
var ownerSavePipeline = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(ownerSavePipeline_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await replaceSimple("pipeline", data);
}));
var ownerSaveEngagements_createServerFn_handler = createServerRpc({
	id: "687ac13689ac053b096a06ebd8f02995d7d935ecfa5756a20a623e95a6185c2a",
	name: "ownerSaveEngagements",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerSaveEngagements.__executeServer(opts));
var ownerSaveEngagements = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(ownerSaveEngagements_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await replaceSimple("engagements", data);
}));
var ownerSaveCapabilities_createServerFn_handler = createServerRpc({
	id: "4ee635d7fe72b4bd5dacea4adf70db9245e868ad522925489144d94e40c856db",
	name: "ownerSaveCapabilities",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerSaveCapabilities.__executeServer(opts));
var ownerSaveCapabilities = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(ownerSaveCapabilities_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await replaceSimple("capabilities", data);
}));
var ownerSaveService_createServerFn_handler = createServerRpc({
	id: "e7a381876a0057ddcb052de5175a6585f72e53a0d5e2509ccfef44f86f9eb3a2",
	name: "ownerSaveService",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerSaveService.__executeServer(opts));
var ownerSaveService = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(ownerSaveService_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await upsertService(data);
}));
var ownerDeleteService_createServerFn_handler = createServerRpc({
	id: "cecbaf19dd72f0740ccbf512b733979491e294ecf48aa962a021604a45d0ff01",
	name: "ownerDeleteService",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerDeleteService.__executeServer(opts));
var ownerDeleteService = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ slug: string() }).parse(input)).handler(ownerDeleteService_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await deleteBySlug("services", data.slug);
}));
var ownerSaveProject_createServerFn_handler = createServerRpc({
	id: "98e49a84cf68b79968757b9881fb65bdd62531e52bed7b4bf57822a21518dcec",
	name: "ownerSaveProject",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerSaveProject.__executeServer(opts));
var ownerSaveProject = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(ownerSaveProject_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await upsertProject(data);
}));
var ownerDeleteProject_createServerFn_handler = createServerRpc({
	id: "e8605ad6db71435dea84a0162e9cae55ee2dabc437f5c616c82cdbd68fe67c8a",
	name: "ownerDeleteProject",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerDeleteProject.__executeServer(opts));
var ownerDeleteProject = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ slug: string() }).parse(input)).handler(ownerDeleteProject_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await deleteBySlug("projects", data.slug);
}));
var ownerSaveProduct_createServerFn_handler = createServerRpc({
	id: "2471182d8d6af6974ec163bfddbce21f43d842b3239c4b3f78903c76fd959c3b",
	name: "ownerSaveProduct",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerSaveProduct.__executeServer(opts));
var ownerSaveProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(ownerSaveProduct_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await upsertProduct(data);
}));
var ownerDeleteProduct_createServerFn_handler = createServerRpc({
	id: "facadb5629689e4be70466da1ba6c57451a4584f93d7146c2509f69fa01f4ee3",
	name: "ownerDeleteProduct",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerDeleteProduct.__executeServer(opts));
var ownerDeleteProduct = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ slug: string() }).parse(input)).handler(ownerDeleteProduct_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await deleteBySlug("products", data.slug);
}));
var ownerSavePost_createServerFn_handler = createServerRpc({
	id: "99b1a92f611b2a376beb3981962dc8956bcb419080f07a2dbaf517ddf342d493",
	name: "ownerSavePost",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerSavePost.__executeServer(opts));
var ownerSavePost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(ownerSavePost_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await upsertPost(data);
}));
var ownerDeletePost_createServerFn_handler = createServerRpc({
	id: "bf8be7a766563ff317f024d00bf6703183dba9fe3547ddc6b3bec1745a5e0601",
	name: "ownerDeletePost",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerDeletePost.__executeServer(opts));
var ownerDeletePost = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ slug: string() }).parse(input)).handler(ownerDeletePost_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await deleteBySlug("posts", data.slug);
}));
var ownerSaveBot_createServerFn_handler = createServerRpc({
	id: "dffefd66ca0e4edcb5a99478b1ff6e46ad19625825c33fc4099a771e8f5e6925",
	name: "ownerSaveBot",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerSaveBot.__executeServer(opts));
var ownerSaveBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(ownerSaveBot_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await upsertBot(data);
}));
var ownerDeleteBot_createServerFn_handler = createServerRpc({
	id: "0146a1011e201218b1bebfe79cc8afee4ccf2e2c08f872f6067ac1bec0f30931",
	name: "ownerDeleteBot",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerDeleteBot.__executeServer(opts));
var ownerDeleteBot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ slug: string() }).parse(input)).handler(ownerDeleteBot_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await deleteBySlug("bots", data.slug);
}));
var ownerSaveReview_createServerFn_handler = createServerRpc({
	id: "315a271c326fcf61f8130fcf761a4a71ddbbc38c9b01ffc0864661a642416891",
	name: "ownerSaveReview",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerSaveReview.__executeServer(opts));
var ownerSaveReview = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(ownerSaveReview_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	const current = (await readSite(false)).reviews.find((r) => r.id === data.id);
	if (!current) throw new Error("Review not found.");
	await upsertReview({
		...current,
		...data
	});
}));
var ownerDeleteReview_createServerFn_handler = createServerRpc({
	id: "01b52493cd23a9d3d929c1cbcaa76f255faa91ecfc840894c7a91c43302e8152",
	name: "ownerDeleteReview",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerDeleteReview.__executeServer(opts));
var ownerDeleteReview = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ id: string() }).parse(input)).handler(ownerDeleteReview_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await deleteReview(data.id);
}));
var ownerSetStatus_createServerFn_handler = createServerRpc({
	id: "b1d827663d906cea755dedd09d800510c3a4b5ad54ea4044692f2ba22ec259fc",
	name: "ownerSetStatus",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerSetStatus.__executeServer(opts));
var ownerSetStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	table: _enum([
		"briefs",
		"messages",
		"orders"
	]),
	id: string(),
	status: string().min(1).max(40)
}).parse(input)).handler(ownerSetStatus_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await setRowStatus(data.table, data.id, data.status);
}));
var ownerAddOwner_createServerFn_handler = createServerRpc({
	id: "2e4c780d1717723b705dddc8dd40737f12d2dc57cd6d4006b24bca054075369c",
	name: "ownerAddOwner",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerAddOwner.__executeServer(opts));
var ownerAddOwner = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	userId: string().min(1),
	email: string().optional()
}).parse(input)).handler(ownerAddOwner_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await addOwner(data.userId, data.email ?? null);
}));
var ownerRemoveOwner_createServerFn_handler = createServerRpc({
	id: "e7604ec1bad9d43d3e630f1ff8c6bc9144f39e0ca1cff126c1ec67b146d124f8",
	name: "ownerRemoveOwner",
	filename: "src/lib/cms/owner.ts"
}, (opts) => ownerRemoveOwner.__executeServer(opts));
var ownerRemoveOwner = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ userId: string().min(1) }).parse(input)).handler(ownerRemoveOwner_createServerFn_handler, async ({ context, data }) => result(async () => {
	await asOwner(context.userId);
	await removeOwner(data.userId, context.userId);
}));
//#endregion
export { ownerAddOwner_createServerFn_handler, ownerBootstrap_createServerFn_handler, ownerDeleteBot_createServerFn_handler, ownerDeletePost_createServerFn_handler, ownerDeleteProduct_createServerFn_handler, ownerDeleteProject_createServerFn_handler, ownerDeleteReview_createServerFn_handler, ownerDeleteService_createServerFn_handler, ownerRemoveOwner_createServerFn_handler, ownerSaveBot_createServerFn_handler, ownerSaveCapabilities_createServerFn_handler, ownerSaveEngagements_createServerFn_handler, ownerSaveFaqs_createServerFn_handler, ownerSavePipeline_createServerFn_handler, ownerSavePost_createServerFn_handler, ownerSavePrinciples_createServerFn_handler, ownerSaveProduct_createServerFn_handler, ownerSaveProject_createServerFn_handler, ownerSaveReview_createServerFn_handler, ownerSaveService_createServerFn_handler, ownerSaveSettings_createServerFn_handler, ownerSetStatus_createServerFn_handler };
