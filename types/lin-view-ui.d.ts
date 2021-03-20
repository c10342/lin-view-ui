import Vue, { PluginObject } from "vue";

import { LinViewUIComponent } from "./component";

import { LinAlert } from "./Alert";
import { LinBacktop } from "./Backtop";
import { LinBadge } from "./Badge";
import { LinButton } from "./Button";
import { LinCascader } from "./Cascader";
import { LinCheckbox } from "./Checkbox";
import { LinCheckboxGroup } from "./CheckboxGroup";
import { LinChoiceGroup } from "./ChoiceGroup";
import { LinChoiceItem } from "./ChoiceItem";
import { LinChoiceOption } from "./ChoiceOption";
import { LinCol } from "./Col";
import { LinCollapseGroup } from "./CollapseGroup";
import { LinCollapseItem } from "./CollapseItem";
import { LinDateAxis } from "./DateAxis";
import { LinDatePicker } from "./DatePicker";
import { LinDialog } from "./Dialog";
import { LinDropdown } from "./Dropdown";
import { LinDropdownGroup } from "./DropdownGroup";
import { LinDropdownItem } from "./DropdownItem";
import { LinForm } from "./Form";
import { LinFormItem } from "./FormItem";
import { LinHoverEffect } from "./HoverEffect";
import { LinImage } from "./Image";
import { LinInput } from "./Input";
import { LinInputNumber } from "./InputNumber";
import { LinLimitTextarea } from "./LimitTextarea";
import { LinLink } from "./Link";
import { LinLiveComment } from "./LiveComment";
import { LinLoading } from "./Loading";
import { LoadingBarService } from "./LoadingBard";
import { LinMagnifier } from "./Magnifier";
import { LinMessageService } from "./Message";
import { LinMessageBoxService } from "./MessageBox";
import { LinPageHeader } from "./PageHeader";
import { LinPagination } from "./Pagination";
import { LinPanel } from "./Panel";
import { LinProgress } from "./Progress";
import { LinRadio } from "./Radio";
import { LinRadioGroup } from "./RadioGroup";
import { LinRow } from "./Row";
import { LinScrollBar } from "./ScrollBar";
import { LinScrollView } from "./ScrollView";
import { LinSelectorGroup } from "./SelectorGroup";
import { LinSelectorItem } from "./SelectorItem";
import { LinShowMore } from "./ShowMore";
import { LinSkeleton } from "./Skeleton";
import { LinSpinner } from "./Spinner";
import { LinSwitch } from "./Switch";
import { LinTabGroup } from "./TabGroup";
import { LinTabItem } from "./TabItem";
import { LinTable } from "./Table";
import { LinTableColumn } from "./TableColumn";
import { LinTag } from "./Tag";
import { LinTooltip } from "./Tooltip";
import { LinUpload } from "./Upload";
import { LinVideoCard } from "./VideoCard";
import { LinVideoPlayerService } from "./VideoPlayer";

export interface InstallationOptions {
  locale: any;
  i18n: any;
}

// 版本号
export const version: string;

export function install(vue: typeof Vue, options: InstallationOptions): void;

export type Component = LinViewUIComponent;

export const Loading: LinLoading;

export const LoadingBar: LoadingBarService;

export const Message: LinMessageService;

export const MessageBox: LinMessageBoxService;

export const Tooltip: PluginObject<LinTooltip>;

export const VideoPlayer: LinVideoPlayerService;

export class Alert extends LinAlert {}

export class Backtop extends LinBacktop {}

export class Badge extends LinBadge {}

export class Button extends LinButton {}

export class Cascader extends LinCascader {}

export class Checkbox extends LinCheckbox {}

export class CheckboxGroup extends LinCheckboxGroup {}

export class ChoiceGroup extends LinChoiceGroup {}

export class ChoiceItem extends LinChoiceItem {}

export class ChoiceOption extends LinChoiceOption {}

export class Col extends LinCol {}

export class CollapseGroup extends LinCollapseGroup {}

export class CollapseItem extends LinCollapseItem {}

export class DateAxis extends LinDateAxis {}

export class DatePicker extends LinDatePicker {}

export class Dialog extends LinDialog {}

export class Dropdown extends LinDropdown {}

export class DropdownGroup extends LinDropdownGroup {}

export class DropdownItem extends LinDropdownItem {}

export class Form extends LinForm {}

export class FormItem extends LinFormItem {}

export class HoverEffect extends LinHoverEffect {}

export class Image extends LinImage {}

export class Input extends LinInput {}

export class InputNumber extends LinInputNumber {}

export class LimitTextarea extends LinLimitTextarea {}

export class Link extends LinLink {}

export class LiveComment extends LinLiveComment {}

export class Magnifier extends LinMagnifier {}

export class PageHeader extends LinPageHeader {}

export class Pagination extends LinPagination {}

export class Panel extends LinPanel {}

export class Progress extends LinProgress {}

export class Radio extends LinRadio {}

export class RadioGroup extends LinRadioGroup {}

export class Row extends LinRow {}

export class ScrollBar extends LinScrollBar {}

export class ScrollView extends LinScrollView {}

export class SelectorGroup extends LinSelectorGroup {}

export class SelectorItem extends LinSelectorItem {}

export class ShowMore extends LinShowMore {}

export class Skeleton extends LinSkeleton {}

export class Spinner extends LinSpinner {}

export class Switch extends LinSwitch {}

export class TabGroup extends LinTabGroup {}

export class TabItem extends LinTabItem {}

export class Table extends LinTable {}

export class TableColumn extends LinTableColumn {}

export class Tag extends LinTag {}

export class Upload extends LinUpload {}

export class VideoCard extends LinVideoCard {}
