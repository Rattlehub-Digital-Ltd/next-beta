import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

export default function ArticlesTab() {
	return (
		<div className="p-3 bg-[#FFFFFF]/65 space-y-3 border border-black/5 rounded-3xl backdrop-blur-[25px] shadow-[0px_8px_30px_0px rgba(106, 106, 106, 0.06)]">
			<div className="px-2">
				<p className="text-[13px] font-medium">Articles</p>
				<p className="text-xs text-[#616161]">
					Read up on articles on this topic
				</p>
			</div>
			<Accordion type="single" collapsible>
				{data.map((article) => (
					<AccordionItem
						key={`${article.title}-${article.author}`}
						value={article.title}
					>
						<AccordionTrigger>
							<div className="flex space-x-3 px-4">
								<Avatar>
									<AvatarImage src={article.image} />
									<AvatarFallback className="text-[10px]">
										{getInitials(article.author)}
									</AvatarFallback>
								</Avatar>
								<div className="space-y-1">
									<p className="text-sm font-medium line-clamp-2">
										{article.title}
									</p>
									<p className="text-xs text-neutral-400 line-clamp-1">
										{article.author}
									</p>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="w-full flex flex-col space-y-2 overflow-hidden px-4">
								<p className="text-[13.8px] text-neutral-600">
									{article.summary}
								</p>
								<a
									className="flex-grow overflow-hidden text-blue-600 font-medium"
									href={article.link}
								>
									<p className="text-xs font-medium truncate line-clamp-1">
										{article.link}
									</p>
								</a>
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}

const data = [
	{
		author: "Libity.co.za",
		image: "https://i.pravatar.cc/150?u=a04258114e29026302d",

		link: "https://www.liberty.co.za/media-insights/secure-your-familys-future:-the-importance-of-estate-planning",
		title: "Secure Your Family's Future: The Importance of Estate Planning",
		summary:
			"When we think about the future, we think about our dreams and aspirations. Have you ever considered what happens to your loved ones after you're gone? It's not a pleasant thought, but it's an important one. That's where estate planning comes in—a simple yet powerful way to secure your family's future, especially when you have assets like a home.",
	},
	{
		author: "Naeelah Williams, Probono.org",
		image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",

		link: "https://probono.org.za/the-importance-of-estate-planning-and-having-a-will-in-place/",
		title: "The importance of estate planning and having a will in place",
		summary:
			"Estate planning can be defined as planning and preparing for the transfer of a person’s assets upon death. Policies, pension funds, immovable and movable property all form part of one’s deceased estate. However, so does one’s debts and liabilities.",
	},
	{
		author: "David Horton, UCDAVIC School of Law",
		image: "https://i.pravatar.cc/150?u=a04258a2462d826712d",

		link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2833019",
		title: "Tomorrow's Inheritance: The Frontiers of Estate Planning Formalism",
		summary:
			"The rules that govern the creation of an estate plan are in flux. Courts once demanded strict adherence to the Wills Act. Yet this legacy of hyper-vigilance is waning, as the Uniform Probate Code, the Restatement (Third) of Property, and ten states have adopted the harmless error rule. Meanwhile, trusts, which need not comply with the Wills Act, have eclipsed wills as the dominant method of posthumous wealth transmission.",
	},
	{
		author:
			"Faziatul Amillia Mohamad Basir, Wan Marhaini Wan Ahmad, and Mahfuzur Rahman",
		image: "https://i.pravatar.cc/150?u=a04258114e29026708c",

		link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2833019",
		title: "Estate Planning Behaviour: A Systematic Literature Review",
		summary:
			"Estate planning is a financial tool for an individual to manage wealth upon his incapacitation or death. Although there are numerous studies on estate planning, there still needs to be an effort to systematically review the estate planning measurements. The paper aims to systematically review the literature published between 1990 to 2021 and evaluate the measures of estate planning and its methodological qualities.",
	},
];
