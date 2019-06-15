<?php
/**
 * BSS Commerce Co.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the EULA
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://bsscommerce.com/Bss-Commerce-License.txt
 *
 * =================================================================
 *                 MAGENTO EDITION USAGE NOTICE
 * =================================================================
 * This package designed for Magento COMMUNITY edition
 * BSS Commerce does not guarantee correct work of this extension
 * on any other Magento edition except Magento COMMUNITY edition.
 * BSS Commerce does not provide extension support in case of
 * incorrect edition usage.
 * =================================================================
 *
 * @category   BSS
 * @package    Bss_BundleOptionImage
 * @author     Extension Team
 * @copyright  Copyright (c) 2014-2016 BSS Commerce Co. ( http://bsscommerce.com )
 * @license    http://bsscommerce.com/Bss-Commerce-License.txt
 */
namespace Bss\BundleOptionImage\Helper;

class Data extends \Magento\Framework\App\Helper\AbstractHelper
{

    public function isEnabled()
    {
        return $this->scopeConfig->isSetFlag('bundle_option_image/general/active', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    }

    public function getClassOption()
    {
        return $this->scopeConfig->getValue('bundle_option_image/general/class_option_bundle', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    }

    public function getImageWidth()
    {
        return $this->scopeConfig->getValue('bundle_option_image/img/product_image_width', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    }

    public function getImageHeight()
    {
        return $this->scopeConfig->getValue('bundle_option_image/img/product_image_height', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    }

    public function getNumberItemSlide()
    {
        return $this->scopeConfig->getValue('bundle_option_image/multiple_option/number_item', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    }

    public function getSpeedSlide()
    {
        return $this->scopeConfig->getValue('bundle_option_image/multiple_option/speed_slide', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    }

    public function getSlideAuto()
    {
        return $this->scopeConfig->isSetFlag('bundle_option_image/multiple_option/slide_auto', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    }
}
