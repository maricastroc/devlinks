import { useRef } from 'react';
import { UserLinkProps } from '@/types/user-link';
import { PlatformProps } from '@/types/platform';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd';
import { LinkForm } from './LinkForm';
import { FormErrors } from '../Index';

type Props = {
  links: UserLinkProps[];
  filteredPlatforms: PlatformProps[];
  errors: FormErrors;
  onDragEnd: (result: DropResult) => void;
  onRemoveLink: (id: number) => void;
  onUpdateUsername: (id: number, username: string) => void;
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
  onUpdateUsername
}: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement | null>;

  return (
    <div className="flex flex-col h-full gap-4 mt-6 links-list-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="linksList">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={(el) => {
                provided.innerRef(el);
                scrollContainerRef.current = el;
              }}
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
                      id={`link-${link.id}`}
                    >
                      <LinkForm
                        platforms={filteredPlatforms}
                        link={link}
                        provided={provided}
                        index={index}
                        handleRemove={onRemoveLink}
                        handleUpdateUsername={onUpdateUsername}
                        handleUpdateCustomName={onUpdateCustomName}
                        errorUsername={errors[String(link.id)]?.username}
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
