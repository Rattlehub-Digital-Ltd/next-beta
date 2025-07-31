import { Icon } from "@iconify/react";
import Link from "next/link";
import SuggestedItem from "@/features/dashboard/suggestions/suggested-item";
import Header from "@/features/shared/header";

export default function SuggestionsPage() {
	return (
		<div className="pt-3 space-y-4 pb-8">
			<Header
				title="Suggestions"
				description="Organize and store essential family-related documents."
				content={
					<Link
						href="/"
						className="flex items-center space-x-2 text-[#27A7BE] font-medium text-[13px] leading-4 no-underline py-2"
					>
						<Icon
							icon="fluent:gift-20-filled"
							className="shrink-0"
							height={18}
							width={18}
						/>
						<p>Invite a friend and get 5% off</p>
						<Icon icon="fluent:chevron-right-16-filled" />
					</Link>
				}
			/>
			<div className="flex flex-col space-y-4">
				{data.map((item) => (
					<SuggestedItem key={item.id} item={item} />
				))}
			</div>
		</div>
	);
}

const data = [
	{
		ranking: 4.5188,
		suggestedFor: [
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["John Wick"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Black Widow"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
		],
		serviceProviders: [
			{
				name: "NextDot Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more.",
				isPreferred: true,
			},
			{
				name: "Other Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more",
				isPreferred: false,
			},
		],
		suggestedReadings: [
			{
				name: "Read about this at NextDot.Ai",
				link: "https://nextdot.ai",
			},
		],
		id: "58967f22-cc1c-4cc1-a9e7-eb36c5dfa5df|66b82b46-f685-46d6-afd3-9c493c820fe0|2231704490061893844|4ff0ce2a-762a-444d-8f0a-98de5acfe5d8",
		name: "LifePolicy",
		displayName: "Life Policy",
		eduText:
			"If you have a family, life insurance is essential because it helps protect your loved ones financially",
		isApplicable: null,
		riskItems: [
			{
				category: "Protection",
				goalName: "Life Insurance Claim",
				eduText:
					"Without life insurance, your loved ones may face financial hardship, leaving them exposed to debts, living expenses, or educational costs without a safety net.",
			},
			{
				category: "Delay",
				goalName: "Life Insurance Claim",
				eduText:
					"If no policy exists or is inaccessible, beneficiaries may face long delays in securing funds, creating stress during an already difficult time.",
			},
			{
				category: "Cost",
				goalName: "Life Insurance Claim",
				eduText:
					"Your family may need to rely on savings, sell assets, or take on debt to cover immediate financial needs, potentially losing wealth unnecessarily.",
			},
			{
				category: "Protection",
				goalName: "Estate Plan",
				eduText:
					"Without clear life insurance information, your loved ones may face financial strain, leaving essential expenses like mortgage payments or education costs uncovered.",
			},
			{
				category: "Delay",
				goalName: "Estate Plan",
				eduText:
					"Lack of documentation can slow down the payout process, leaving beneficiaries waiting during a critical time.",
			},
			{
				category: "Cost",
				goalName: "Estate Plan",
				eduText:
					"Without life insurance proceeds, the estate may need to liquidate valuable assets or incur debt to cover final expenses, creating unnecessary financial and emotional stress.",
			},
			{
				category: "Protection",
				goalName: "Legacy",
				eduText:
					"Without clear life insurance information, your loved ones may face financial strain, leaving essential expenses like mortgage payments or education costs uncovered.",
			},
			{
				category: "Delay",
				goalName: "Legacy",
				eduText:
					"Lack of documentation can slow down the payout process, leaving beneficiaries waiting during a critical time.",
			},
			{
				category: "Cost",
				goalName: "Legacy",
				eduText:
					"Without life insurance proceeds, the estate may need to liquidate valuable assets or incur debt to cover final expenses, creating unnecessary financial and emotional stress.",
			},
		],
	},
	{
		ranking: 4.5188,
		suggestedFor: [
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["John Wick"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Black Widow"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
		],
		serviceProviders: [
			{
				name: "NextDot Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more.",
				isPreferred: true,
			},
			{
				name: "Other Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more",
				isPreferred: false,
			},
		],
		suggestedReadings: [
			{
				name: "Read about this at NextDot.Ai",
				link: "https://nextdot.ai",
			},
		],
		id: "399a1410-00d0-4eb1-bd4f-edc9acbc36c4|66b82b46-f685-46d6-afd3-9c493c820fe0|2231704490061893844|4ff0ce2a-762a-444d-8f0a-98de5acfe5d8",
		name: "LifePolicy",
		displayName: "Life Policy",
		eduText:
			"If you have a family, life insurance is essential because it helps protect your loved ones financially",
		isApplicable: null,
		riskItems: [
			{
				category: "Protection",
				goalName: "Life Insurance Claim",
				eduText:
					"Without life insurance, your loved ones may face financial hardship, leaving them exposed to debts, living expenses, or educational costs without a safety net.",
			},
			{
				category: "Delay",
				goalName: "Life Insurance Claim",
				eduText:
					"If no policy exists or is inaccessible, beneficiaries may face long delays in securing funds, creating stress during an already difficult time.",
			},
			{
				category: "Cost",
				goalName: "Life Insurance Claim",
				eduText:
					"Your family may need to rely on savings, sell assets, or take on debt to cover immediate financial needs, potentially losing wealth unnecessarily.",
			},
			{
				category: "Protection",
				goalName: "Estate Plan",
				eduText:
					"Without clear life insurance information, your loved ones may face financial strain, leaving essential expenses like mortgage payments or education costs uncovered.",
			},
			{
				category: "Delay",
				goalName: "Estate Plan",
				eduText:
					"Lack of documentation can slow down the payout process, leaving beneficiaries waiting during a critical time.",
			},
			{
				category: "Cost",
				goalName: "Estate Plan",
				eduText:
					"Without life insurance proceeds, the estate may need to liquidate valuable assets or incur debt to cover final expenses, creating unnecessary financial and emotional stress.",
			},
			{
				category: "Protection",
				goalName: "Legacy",
				eduText:
					"Without clear life insurance information, your loved ones may face financial strain, leaving essential expenses like mortgage payments or education costs uncovered.",
			},
			{
				category: "Delay",
				goalName: "Legacy",
				eduText:
					"Lack of documentation can slow down the payout process, leaving beneficiaries waiting during a critical time.",
			},
			{
				category: "Cost",
				goalName: "Legacy",
				eduText:
					"Without life insurance proceeds, the estate may need to liquidate valuable assets or incur debt to cover final expenses, creating unnecessary financial and emotional stress.",
			},
		],
	},
	{
		ranking: 4.5188,
		suggestedFor: [
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["John Wick"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Black Widow"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
		],
		serviceProviders: [
			{
				name: "NextDot Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more.",
				isPreferred: true,
			},
			{
				name: "Other Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more",
				isPreferred: false,
			},
		],
		suggestedReadings: [
			{
				name: "Read about this at NextDot.Ai",
				link: "https://nextdot.ai",
			},
		],
		id: "d49870a7-4398-4b1f-9ded-5417cc1903a8|66b82b46-f685-46d6-afd3-9c493c820fe0|2231704490061893844|4ff0ce2a-762a-444d-8f0a-98de5acfe5d8",
		name: "LifePolicy",
		displayName: "Life Policy",
		eduText:
			"If you have a family, life insurance is essential because it helps protect your loved ones financially",
		isApplicable: null,
		riskItems: [
			{
				category: "Protection",
				goalName: "Life Insurance Claim",
				eduText:
					"Without life insurance, your loved ones may face financial hardship, leaving them exposed to debts, living expenses, or educational costs without a safety net.",
			},
			{
				category: "Delay",
				goalName: "Life Insurance Claim",
				eduText:
					"If no policy exists or is inaccessible, beneficiaries may face long delays in securing funds, creating stress during an already difficult time.",
			},
			{
				category: "Cost",
				goalName: "Life Insurance Claim",
				eduText:
					"Your family may need to rely on savings, sell assets, or take on debt to cover immediate financial needs, potentially losing wealth unnecessarily.",
			},
			{
				category: "Protection",
				goalName: "Estate Plan",
				eduText:
					"Without clear life insurance information, your loved ones may face financial strain, leaving essential expenses like mortgage payments or education costs uncovered.",
			},
			{
				category: "Delay",
				goalName: "Estate Plan",
				eduText:
					"Lack of documentation can slow down the payout process, leaving beneficiaries waiting during a critical time.",
			},
			{
				category: "Cost",
				goalName: "Estate Plan",
				eduText:
					"Without life insurance proceeds, the estate may need to liquidate valuable assets or incur debt to cover final expenses, creating unnecessary financial and emotional stress.",
			},
			{
				category: "Protection",
				goalName: "Legacy",
				eduText:
					"Without clear life insurance information, your loved ones may face financial strain, leaving essential expenses like mortgage payments or education costs uncovered.",
			},
			{
				category: "Delay",
				goalName: "Legacy",
				eduText:
					"Lack of documentation can slow down the payout process, leaving beneficiaries waiting during a critical time.",
			},
			{
				category: "Cost",
				goalName: "Legacy",
				eduText:
					"Without life insurance proceeds, the estate may need to liquidate valuable assets or incur debt to cover final expenses, creating unnecessary financial and emotional stress.",
			},
		],
	},
	{
		ranking: 4.5188,
		suggestedFor: [
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["John Wick"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Black Widow"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Partner",
				displayName: "Spouse / Partner",
				eduText: null,
				affectedOwners: ["Halle Berry"],
			},
		],
		serviceProviders: [
			{
				name: "NextDot Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more.",
				isPreferred: true,
			},
			{
				name: "Other Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more",
				isPreferred: false,
			},
		],
		suggestedReadings: [
			{
				name: "Read about this at NextDot.Ai",
				link: "https://nextdot.ai",
			},
		],
		id: "bf7c9a76-c5b6-4c80-a691-17d462e2e71f|66b82b46-f685-46d6-afd3-9c493c820fe0|2231704490061893844|4ff0ce2a-762a-444d-8f0a-98de5acfe5d8",
		name: "LifePolicy",
		displayName: "Life Policy",
		eduText:
			"If you have a family, life insurance is essential because it helps protect your loved ones financially",
		isApplicable: null,
		riskItems: [
			{
				category: "Protection",
				goalName: "Life Insurance Claim",
				eduText:
					"Without life insurance, your loved ones may face financial hardship, leaving them exposed to debts, living expenses, or educational costs without a safety net.",
			},
			{
				category: "Delay",
				goalName: "Life Insurance Claim",
				eduText:
					"If no policy exists or is inaccessible, beneficiaries may face long delays in securing funds, creating stress during an already difficult time.",
			},
			{
				category: "Cost",
				goalName: "Life Insurance Claim",
				eduText:
					"Your family may need to rely on savings, sell assets, or take on debt to cover immediate financial needs, potentially losing wealth unnecessarily.",
			},
			{
				category: "Protection",
				goalName: "Estate Plan",
				eduText:
					"Without clear life insurance information, your loved ones may face financial strain, leaving essential expenses like mortgage payments or education costs uncovered.",
			},
			{
				category: "Delay",
				goalName: "Estate Plan",
				eduText:
					"Lack of documentation can slow down the payout process, leaving beneficiaries waiting during a critical time.",
			},
			{
				category: "Cost",
				goalName: "Estate Plan",
				eduText:
					"Without life insurance proceeds, the estate may need to liquidate valuable assets or incur debt to cover final expenses, creating unnecessary financial and emotional stress.",
			},
			{
				category: "Protection",
				goalName: "Legacy",
				eduText:
					"Without clear life insurance information, your loved ones may face financial strain, leaving essential expenses like mortgage payments or education costs uncovered.",
			},
			{
				category: "Delay",
				goalName: "Legacy",
				eduText:
					"Lack of documentation can slow down the payout process, leaving beneficiaries waiting during a critical time.",
			},
			{
				category: "Cost",
				goalName: "Legacy",
				eduText:
					"Without life insurance proceeds, the estate may need to liquidate valuable assets or incur debt to cover final expenses, creating unnecessary financial and emotional stress.",
			},
		],
	},
	{
		ranking: 3.7031,
		suggestedFor: [
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["John Wick"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Black Widow"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
		],
		serviceProviders: [
			{
				name: "NextDot Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more.",
				isPreferred: true,
			},
			{
				name: "Other Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more",
				isPreferred: false,
			},
		],
		suggestedReadings: [
			{
				name: "Read about this at NextDot.Ai",
				link: "https://nextdot.ai",
			},
		],
		id: "c2e396aa-80da-4f04-89fc-b8e29d4a582c|a0b79bad-02cd-4540-b8c5-385532015d54|-4293318544564735908|4ff0ce2a-762a-444d-8f0a-98de5acfe5d8",
		name: "Medical",
		displayName: "Medical Insurance",
		eduText:
			"Insurance that helps pay for healthcare costs. It can be private (purchased individually or through an employer) or social (provided by the government as part of a public health system)",
		isApplicable: null,
		riskItems: [
			{
				category: "Protection",
				goalName: "Legacy",
				eduText:
					"Without clear medical information, loved ones may struggle to make informed decisions about your care, potentially exposing you to treatments or situations that don't align with your wishes.",
			},
			{
				category: "Delay",
				goalName: "Legacy",
				eduText:
					"Healthcare providers and family members may face delays in accessing critical details, slowing down urgent medical or estate-related decisions.",
			},
			{
				category: "Cost",
				goalName: "Legacy",
				eduText:
					" Uncertainty around your health status could lead to expensive, unnecessary treatments or disputes over long-term care arrangements, adding financial and emotional strain on your family.",
			},
		],
	},
	{
		ranking: 3.7031,
		suggestedFor: [
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["John Wick"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Black Widow"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
		],
		serviceProviders: [
			{
				name: "NextDot Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more.",
				isPreferred: true,
			},
			{
				name: "Other Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more",
				isPreferred: false,
			},
		],
		suggestedReadings: [
			{
				name: "Read about this at NextDot.Ai",
				link: "https://nextdot.ai",
			},
		],
		id: "d1226ddf-2c3d-4a74-93ba-36087fe519b6|a0b79bad-02cd-4540-b8c5-385532015d54|-4293318544564735908|4ff0ce2a-762a-444d-8f0a-98de5acfe5d8",
		name: "Medical",
		displayName: "Medical Insurance",
		eduText:
			"Insurance that helps pay for healthcare costs. It can be private (purchased individually or through an employer) or social (provided by the government as part of a public health system)",
		isApplicable: null,
		riskItems: [
			{
				category: "Protection",
				goalName: "Legacy",
				eduText:
					"Without clear medical information, loved ones may struggle to make informed decisions about your care, potentially exposing you to treatments or situations that don't align with your wishes.",
			},
			{
				category: "Delay",
				goalName: "Legacy",
				eduText:
					"Healthcare providers and family members may face delays in accessing critical details, slowing down urgent medical or estate-related decisions.",
			},
			{
				category: "Cost",
				goalName: "Legacy",
				eduText:
					" Uncertainty around your health status could lead to expensive, unnecessary treatments or disputes over long-term care arrangements, adding financial and emotional strain on your family.",
			},
		],
	},
	{
		ranking: 3.7031,
		suggestedFor: [
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["John Wick"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Black Widow"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
		],
		serviceProviders: [
			{
				name: "NextDot Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more.",
				isPreferred: true,
			},
			{
				name: "Other Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more",
				isPreferred: false,
			},
		],
		suggestedReadings: [
			{
				name: "Read about this at NextDot.Ai",
				link: "https://nextdot.ai",
			},
		],
		id: "89b9920c-f1fd-4ec6-a7f7-93ea17ccb2e2|a0b79bad-02cd-4540-b8c5-385532015d54|-4293318544564735908|4ff0ce2a-762a-444d-8f0a-98de5acfe5d8",
		name: "Medical",
		displayName: "Medical Insurance",
		eduText:
			"Insurance that helps pay for healthcare costs. It can be private (purchased individually or through an employer) or social (provided by the government as part of a public health system)",
		isApplicable: null,
		riskItems: [
			{
				category: "Protection",
				goalName: "Legacy",
				eduText:
					"Without clear medical information, loved ones may struggle to make informed decisions about your care, potentially exposing you to treatments or situations that don't align with your wishes.",
			},
			{
				category: "Delay",
				goalName: "Legacy",
				eduText:
					"Healthcare providers and family members may face delays in accessing critical details, slowing down urgent medical or estate-related decisions.",
			},
			{
				category: "Cost",
				goalName: "Legacy",
				eduText:
					" Uncertainty around your health status could lead to expensive, unnecessary treatments or disputes over long-term care arrangements, adding financial and emotional strain on your family.",
			},
		],
	},
	{
		ranking: 3.7031,
		suggestedFor: [
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["John Wick"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Black Widow"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
			{
				name: "Child",
				displayName: "Children",
				eduText: null,
				affectedOwners: ["Your child"],
			},
			{
				name: "Dependent",
				displayName: "Dependent",
				eduText: null,
				affectedOwners: ["Your dependent"],
			},
		],
		serviceProviders: [
			{
				name: "NextDot Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more.",
				isPreferred: true,
			},
			{
				name: "Other Advisory",
				summary:
					"This could be your business. Click [here](https://nextdot.ai/contact-us/) to learn more",
				isPreferred: false,
			},
		],
		suggestedReadings: [
			{
				name: "Read about this at NextDot.Ai",
				link: "https://nextdot.ai",
			},
		],
		id: "6385e881-ac6c-4478-85af-d37ac43bd1a0|a0b79bad-02cd-4540-b8c5-385532015d54|-4293318544564735908|4ff0ce2a-762a-444d-8f0a-98de5acfe5d8",
		name: "Medical",
		displayName: "Medical Insurance",
		eduText:
			"Insurance that helps pay for healthcare costs. It can be private (purchased individually or through an employer) or social (provided by the government as part of a public health system)",
		isApplicable: null,
		riskItems: [
			{
				category: "Protection",
				goalName: "Legacy",
				eduText:
					"Without clear medical information, loved ones may struggle to make informed decisions about your care, potentially exposing you to treatments or situations that don't align with your wishes.",
			},
			{
				category: "Delay",
				goalName: "Legacy",
				eduText:
					"Healthcare providers and family members may face delays in accessing critical details, slowing down urgent medical or estate-related decisions.",
			},
			{
				category: "Cost",
				goalName: "Legacy",
				eduText:
					" Uncertainty around your health status could lead to expensive, unnecessary treatments or disputes over long-term care arrangements, adding financial and emotional strain on your family.",
			},
		],
	},
];
