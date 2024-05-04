import Pill from "@/ui/pill";

export default function displayTags(tags: string[], limit = 3) {
  let tagsRow: JSX.Element[] = [];
  const tagsSet = new Set(tags);
  let i = 0;

  for (const tag of tagsSet) {
    if (i === limit) {
      tagsRow.push(
        <Pill variant="ghost" key={tag + i}>
          + {tagsSet.size - limit}
        </Pill>,
      );
      break;
    }

    tagsRow.push(
      <Pill variant="primary" key={tag + i}>
        {tag}
      </Pill>,
    );
    i++;
  }

  return tagsRow;
}
