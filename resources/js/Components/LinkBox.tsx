import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputLabel from "./InputLabel";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Github from "/public/assets/images/icon-github.svg";
import TextInput from "./TextInput";
import IconLink from "/public/assets/images/icon-links-header.svg";
import { LinkMark } from "./LinkMark";
import { useState, useRef, useEffect } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { DevlinkProps } from "@/types/devlink";
import { PlatformProps } from "@/types/platform";

type Props = {
  index: number;
  platforms: PlatformProps[];
  link: PlatformProps;
  handleSelect: (item: PlatformProps) => void;
  handleRemove: (id: number) => void;
};

export const LinkBox = ({ index, link, platforms, handleSelect, handleRemove }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [selectedLink, setSelectedLink] = useState<PlatformProps | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col p-4 rounded-lg bg-light-gray">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <LinkMark />
          <p className="font-bold text-medium-gray">{`Link #${index + 1}`}</p>
        </div>
        <button onClick={() => handleRemove(link.id)} className="text-medium-gray">Remove</button>
      </div>

      <div>
        <div className="flex flex-col gap-4 mt-5">
          <div>
            <InputLabel htmlFor="link" value="Link" />
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative w-full mt-1 h-[48px] flex items-center justify-between cursor-pointer bg-white transition-all duration-300 ease-in-out rounded-lg py-3 px-3 border border-neutral-borders hover:border-primary-index hover:shadow-3xl"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-center gap-3">
                  <span>
                    <img src={link?.icon_url ? `/assets/images/${link.icon_url}.svg` : Github} alt="Link icon" width="16" height="16" />
                  </span>
                  <span className="text-dark-grey">{link?.name ? link.name : "Github"}</span>
                </div>
                <FontAwesomeIcon className="text-medium-gray" icon={isDropdownOpen ? faChevronUp : faChevronDown} />
              </div>
              {isDropdownOpen && (
                <div ref={dropdownRef}>
                  <DropdownMenu platforms={platforms} handleSelect={(item: PlatformProps) => {
                    setSelectedLink(item)
                    handleSelect(item)
                  }} />
                </div>
              )}
            </div>
          </div>

          <div>
            <InputLabel htmlFor="link" value="Link" />
            <TextInput
              id="link"
              type="text"
              name="link"
              placeholder="e.g. https://www.github.com/octocat"
              className="block w-full mt-1"
              icon={IconLink}
              isFocused={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
