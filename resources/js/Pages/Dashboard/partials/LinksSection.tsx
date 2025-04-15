import { UserLinkProps } from '@/types/user-link';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd';
import { LinkForm } from './LinkForm';
import { PlatformProps } from '@/types/platform';
import { useLinks } from '@/utils/useLinks';
import { FormErrors } from '../Index';

type Props = {
  links: UserLinkProps[];
  filteredPlatforms: PlatformProps[];
  errors: FormErrors;
  onDragEnd: (result: DropResult) => void;
  onRemoveLink: (id: number) => void;
  onUpdateUrl: (id: number, url: string) => void;
  onUpdateCustomName: (id: number, customName: string) => void;
  onUpdatePlatform: (platform: PlatformProps, id: number) => void;
};

export const LinksSection = ({
  links,
  filteredPlatforms,
  errors,
  onRemoveLink,
  onDragEnd,
  onUpdateCustomName,
  onUpdatePlatform,
  onUpdateUrl
}: Props) => {
  return (
    <div className="flex flex-col h-full gap-4 mt-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="linksList">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col w-full gap-4 overflow-y-auto custom-scrollbar lg:max-h-[30rem]"
            >
              {links.map((link, index) => (
                <Draggable
                  key={link.id.toString()}
                  draggableId={link.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-2"
                    >
                      <LinkForm
                        platforms={filteredPlatforms}
                        link={link}
                        provided={provided}
                        index={index}
                        handleRemove={onRemoveLink}
                        handleUpdateUrl={onUpdateUrl}
                        handleUpdateCustomName={onUpdateCustomName}
                        errorUrl={errors[String(link.id)]?.url}
                        errorCustomName={errors[String(link.id)]?.custom_name}
                        errorPlatform={errors[String(link.id)]?.platform_id}
                        handleSelect={(platform) =>
                          onUpdatePlatform(platform, Number(link.id))
                        }
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
