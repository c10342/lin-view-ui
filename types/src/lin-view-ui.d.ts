import Vue, { PluginObject } from "vue";

import { LinViewUIComponent } from "./component";

import { LinAlert } from "./alert";
import { LinBacktop } from "./backtop";
import { LinBadge } from "./badge";
import { LinButton } from "./button";
import { LinCascader } from "./cascader";
import { LinCheckbox } from "./checkbox";
import { LinCheckboxGroup } from "./checkbox-group";
import { LinChoiceGroup } from "./choice-group";
import { LinChoiceItem } from "./choice-item";
import { LinChoiceOption } from "./choice-option";
import { LinCol } from "./col";
import { LinCollapseGroup } from "./collapse-group";
import { LinCollapseItem } from "./collapse-item";
import { LinDateAxis } from "./date-axis";
import { LinDatePicker } from "./date-picker";
import { LinDialog } from "./dialog";
import { LinDropdown } from "./dropdown";
import { LinDropdownGroup } from "./dropdown-group";
import { LinDropdownItem } from "./dropdown-item";
import { LinForm } from "./form";
import { LinFormItem } from "./form-item";
import { LinHoverEffect } from "./hover-effect";
import { LinImage } from "./image";
import { LinInput } from "./input";
import { LinInputNumber } from "./input-number";
import { LinLimitTextarea } from "./limit-textarea";
import { LinLink } from "./link";
import { LinLiveComment } from "./live-comment";
import { LinLoading } from "./loading";
import { LoadingBarService } from "./loading-bar";
import { LinMagnifier } from "./magnifier";
import { LinMessageService } from "./message";
import { LinMessageBoxService } from "./message-box";
import { LinPageHeader } from "./page-header";
import { LinPagination } from "./pagination";
import { LinPanel } from "./panel";
import { LinProgress } from "./progress";
import { LinRadio } from "./radio";
import { LinRadioGroup } from "./radio-group";
import { LinRow } from "./row";
import { LinScrollBar } from "./scroll-bar";
import { LinScrollView } from "./scroll-view";
import { LinSelectorGroup } from "./selector-group";
import { LinSelectorItem } from "./selector-item";
import { LinShowMore } from "./show-more";
import { LinSkeleton } from "./skeleton";
import { LinSpinner } from "./spinner";
import { LinSwitch } from "./switch";
import { LinTabGroup } from "./tab-group";
import { LinTabItem } from "./tab-item";
import { LinTable } from "./table";
import { LinTableColumn } from "./table-column";
import { LinTag } from "./tag";
import { LinTooltip } from "./tooltip";
import { LinUpload } from "./upload";
import { LinVideoCard } from "./video-card";
import { LinVideoPlayerService } from "./video-player";
import { LinMultiPlayerService } from "./multi-player";
import { LinPlayerFullscreen } from "./player-fullscreen";
import { LinPlayerProcess } from "./player-process";
import { LinPlayerVolume } from "./player-volume";
import { LinMetaInfo } from "./meta-info";

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

export const MultiPlayer: LinMultiPlayerService;

export const MetaInfo: LinMetaInfo;

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

export class PlayerFullscreen extends LinPlayerFullscreen {}

export class PlayerProcess extends LinPlayerProcess {}

export class PlayerVolume extends LinPlayerVolume {}
