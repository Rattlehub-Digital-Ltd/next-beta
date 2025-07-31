"use client";

import { useCallback, useEffect, useState } from "react";
import RiskCarousel from "@/features/shared/risk-carousel";
import SuggestionItem from "@/features/shared/suggestion-item";
import type { ActionsResponse } from "@/types/action-item";

export default function ActionsTab() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<ActionsResponse | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);

		setData({
			items: [
				{
					id: "702ec12b-54c0-4308-a0ab-3a8201390ab7|71459284-d5ac-4724-89ee-4f498cab51e6|-1861793522630258592|74ee308b-e3f9-4c1c-a3b8-2e52854db574",
					name: "AccountConfirmationLetter",
					displayName: "Account Confirmation Letter",
					module: "Assets",
					ownerDisplayName: "Bank Account",
					section: "Assets",
					ranking: 8.5393,
					eduText:
						"An official document from a bank that verifies the existence of an account, including the account holder’s name, account number, and branch details",
					isComplete: false,
					riskItems: [
						{
							category: "Protection",
							goalName: "Estate Liquidity",
							eduText:
								"Without clear confirmation of bank account details, critical estate funds may remain inaccessible, leaving bills, debts, or taxes unpaid, and exposing heirs to financial strain.",
						},
						{
							category: "Delay",
							goalName: "Estate Liquidity",
							eduText:
								"Executors could face delays in locating accounts, navigating bureaucracy, or proving ownership, slowing down the estate settlement process.",
						},
						{
							category: "Cost",
							goalName: "Estate Liquidity",
							eduText:
								"Legal fees may rise as professionals are hired to trace accounts, while emotional stress mounts for loved ones trying to make sense of financial gaps.",
						},
						{
							category: "Protection",
							goalName: "Legacy",
							eduText:
								"Without clear banking information, accounts could remain frozen, leaving loved ones without access to funds for immediate needs like bills, medical expenses, or funeral costs.",
						},
						{
							category: "Delay",
							goalName: "Legacy",
							eduText:
								"The estate's settlement process slows down as executors or heirs struggle to locate accounts and verify balances, potentially dragging on for months.",
						},
						{
							category: "Cost",
							goalName: "Legacy",
							eduText:
								"Additional legal fees and administrative costs arise as professionals are hired to track down missing account details, while families endure unnecessary stress and uncertainty.",
						},
						{
							category: "Protection",
							goalName: "Legacy",
							eduText:
								"Without confirmation letters, bank accounts may remain hidden or inaccessible, leaving funds unprotected and vulnerable to being overlooked.",
						},
						{
							category: "Delay",
							goalName: "Legacy",
							eduText:
								"Executors may face lengthy delays piecing together account details or navigating bank red tape, slowing down the transfer of funds to beneficiaries.",
						},
						{
							category: "Cost",
							goalName: "Legacy",
							eduText:
								"Unnecessary legal fees and emotional strain can arise from trying to access accounts without proper documentation, creating financial and emotional stress for loved ones.",
						},
					],
				},
				{
					id: "b78be158-fd10-4ccb-be9b-1407e4b1d4b7|71459284-d5ac-4724-89ee-4f498cab51e6|-1861793522630258592|45aec74d-fe65-4229-800c-d38ef961621d",
					name: "AccountConfirmationLetter",
					displayName: "Account Confirmation Letter",
					module: "Assets",
					ownerDisplayName: "Bank Account",
					section: "Assets",
					ranking: 8.5393,
					eduText:
						"An official document from a bank that verifies the existence of an account, including the account holder’s name, account number, and branch details",
					isComplete: false,
					riskItems: [
						{
							category: "Protection",
							goalName: "Estate Liquidity",
							eduText:
								"Without clear confirmation of bank account details, critical estate funds may remain inaccessible, leaving bills, debts, or taxes unpaid, and exposing heirs to financial strain.",
						},
						{
							category: "Delay",
							goalName: "Estate Liquidity",
							eduText:
								"Executors could face delays in locating accounts, navigating bureaucracy, or proving ownership, slowing down the estate settlement process.",
						},
						{
							category: "Cost",
							goalName: "Estate Liquidity",
							eduText:
								"Legal fees may rise as professionals are hired to trace accounts, while emotional stress mounts for loved ones trying to make sense of financial gaps.",
						},
						{
							category: "Protection",
							goalName: "Legacy",
							eduText:
								"Without clear banking information, accounts could remain frozen, leaving loved ones without access to funds for immediate needs like bills, medical expenses, or funeral costs.",
						},
						{
							category: "Delay",
							goalName: "Legacy",
							eduText:
								"The estate's settlement process slows down as executors or heirs struggle to locate accounts and verify balances, potentially dragging on for months.",
						},
						{
							category: "Cost",
							goalName: "Legacy",
							eduText:
								"Additional legal fees and administrative costs arise as professionals are hired to track down missing account details, while families endure unnecessary stress and uncertainty.",
						},
						{
							category: "Protection",
							goalName: "Legacy",
							eduText:
								"Without confirmation letters, bank accounts may remain hidden or inaccessible, leaving funds unprotected and vulnerable to being overlooked.",
						},
						{
							category: "Delay",
							goalName: "Legacy",
							eduText:
								"Executors may face lengthy delays piecing together account details or navigating bank red tape, slowing down the transfer of funds to beneficiaries.",
						},
						{
							category: "Cost",
							goalName: "Legacy",
							eduText:
								"Unnecessary legal fees and emotional strain can arise from trying to access accounts without proper documentation, creating financial and emotional stress for loved ones.",
						},
					],
				},
				{
					id: "f4c8f4fe-9eca-4f76-a5f1-8c65adb4c1ad|71459284-d5ac-4724-89ee-4f498cab51e6|-1861793522630258592|4e668119-b132-4987-a293-8cf185baf9ef",
					name: "AccountConfirmationLetter",
					displayName: "Account Confirmation Letter",
					module: "Assets",
					ownerDisplayName: "Bank Account",
					section: "Assets",
					ranking: 8.5393,
					eduText:
						"An official document from a bank that verifies the existence of an account, including the account holder’s name, account number, and branch details",
					isComplete: false,
					riskItems: [
						{
							category: "Protection",
							goalName: "Estate Liquidity",
							eduText:
								"Without clear confirmation of bank account details, critical estate funds may remain inaccessible, leaving bills, debts, or taxes unpaid, and exposing heirs to financial strain.",
						},
						{
							category: "Delay",
							goalName: "Estate Liquidity",
							eduText:
								"Executors could face delays in locating accounts, navigating bureaucracy, or proving ownership, slowing down the estate settlement process.",
						},
						{
							category: "Cost",
							goalName: "Estate Liquidity",
							eduText:
								"Legal fees may rise as professionals are hired to trace accounts, while emotional stress mounts for loved ones trying to make sense of financial gaps.",
						},
						{
							category: "Protection",
							goalName: "Legacy",
							eduText:
								"Without clear banking information, accounts could remain frozen, leaving loved ones without access to funds for immediate needs like bills, medical expenses, or funeral costs.",
						},
						{
							category: "Delay",
							goalName: "Legacy",
							eduText:
								"The estate's settlement process slows down as executors or heirs struggle to locate accounts and verify balances, potentially dragging on for months.",
						},
						{
							category: "Cost",
							goalName: "Legacy",
							eduText:
								"Additional legal fees and administrative costs arise as professionals are hired to track down missing account details, while families endure unnecessary stress and uncertainty.",
						},
						{
							category: "Protection",
							goalName: "Legacy",
							eduText:
								"Without confirmation letters, bank accounts may remain hidden or inaccessible, leaving funds unprotected and vulnerable to being overlooked.",
						},
						{
							category: "Delay",
							goalName: "Legacy",
							eduText:
								"Executors may face lengthy delays piecing together account details or navigating bank red tape, slowing down the transfer of funds to beneficiaries.",
						},
						{
							category: "Cost",
							goalName: "Legacy",
							eduText:
								"Unnecessary legal fees and emotional strain can arise from trying to access accounts without proper documentation, creating financial and emotional stress for loved ones.",
						},
					],
				},
				{
					id: "527d46fb-d272-4726-800d-0bce1cb88603|71459284-d5ac-4724-89ee-4f498cab51e6|-1861793522630258592|1231fc36-026b-460b-90f9-f6a20f189086",
					name: "AccountConfirmationLetter",
					displayName: "Account Confirmation Letter",
					module: "Assets",
					ownerDisplayName: "Bank Account",
					section: "Assets",
					ranking: 8.5393,
					eduText:
						"An official document from a bank that verifies the existence of an account, including the account holder’s name, account number, and branch details",
					isComplete: false,
					riskItems: [
						{
							category: "Protection",
							goalName: "Estate Liquidity",
							eduText:
								"Without clear confirmation of bank account details, critical estate funds may remain inaccessible, leaving bills, debts, or taxes unpaid, and exposing heirs to financial strain.",
						},
						{
							category: "Delay",
							goalName: "Estate Liquidity",
							eduText:
								"Executors could face delays in locating accounts, navigating bureaucracy, or proving ownership, slowing down the estate settlement process.",
						},
						{
							category: "Cost",
							goalName: "Estate Liquidity",
							eduText:
								"Legal fees may rise as professionals are hired to trace accounts, while emotional stress mounts for loved ones trying to make sense of financial gaps.",
						},
						{
							category: "Protection",
							goalName: "Legacy",
							eduText:
								"Without clear banking information, accounts could remain frozen, leaving loved ones without access to funds for immediate needs like bills, medical expenses, or funeral costs.",
						},
						{
							category: "Delay",
							goalName: "Legacy",
							eduText:
								"The estate's settlement process slows down as executors or heirs struggle to locate accounts and verify balances, potentially dragging on for months.",
						},
						{
							category: "Cost",
							goalName: "Legacy",
							eduText:
								"Additional legal fees and administrative costs arise as professionals are hired to track down missing account details, while families endure unnecessary stress and uncertainty.",
						},
						{
							category: "Protection",
							goalName: "Legacy",
							eduText:
								"Without confirmation letters, bank accounts may remain hidden or inaccessible, leaving funds unprotected and vulnerable to being overlooked.",
						},
						{
							category: "Delay",
							goalName: "Legacy",
							eduText:
								"Executors may face lengthy delays piecing together account details or navigating bank red tape, slowing down the transfer of funds to beneficiaries.",
						},
						{
							category: "Cost",
							goalName: "Legacy",
							eduText:
								"Unnecessary legal fees and emotional strain can arise from trying to access accounts without proper documentation, creating financial and emotional stress for loved ones.",
						},
					],
				},
			],
			totalPages: 34,
			totalItems: 134,
			pageNumber: 1,
			pageSize: 4,
		});

		setLoading(false);
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if (loading) return <div>Loading...</div>;

	if (!data) return;

	return (
		<ul className="space-y-4">
			{data.items.map(({ id, displayName, eduText, riskItems }) => (
				<li key={id}>
					<div className="flex flex-col space-y-3 p-4 rounded-[23px] border border-[#EBEDED] backdrop-blur-[25px] bg-white/65 shadow-[0px_16px_30px_0px rgba(106, 106, 106, 0.06)]">
						<SuggestionItem
							title={displayName}
							description={eduText}
							showReminder={false}
							color="teal"
						/>

						<RiskCarousel items={riskItems} />
					</div>
				</li>
			))}
		</ul>
	);
}
