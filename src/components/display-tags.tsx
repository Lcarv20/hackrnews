import Pill from "@/ui/pill";
import * as Dialog from "@radix-ui/react-dialog";

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
      <Dialog.Root>
        <Pill variant="primary" key={tag + i}>
          {tag}
        </Pill>
      </Dialog.Root>,
    );
    i++;
  }

  return tagsRow;
}
